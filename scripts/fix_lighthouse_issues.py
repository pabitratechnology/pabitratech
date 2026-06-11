import os
import re
from PIL import Image

WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HTML_DIR = os.path.join(WORKSPACE_DIR, "html")
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "images")

# List of domains to preconnect to
PRECONNECT_HTML = """
    <!-- Performance Optimizations: Preconnect to CDNs -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>
    <link rel="preconnect" href="https://unpkg.com" crossorigin>
    <!-- Preload critical brand asset -->
    <link rel="preload" as="image" href="/images/pabitra250.webp">
"""

HERO_PRELOAD_HTML = """
    <!-- Preload hero banner for LCP request discovery -->
    <link rel="preload" as="image" href="/images/hero1.webp">
"""

def fix_head_elements(html_content, is_index=False):
    # 1. Preconnects & preloads injection
    # We place them right after the opening <head> or right before CSS links
    if "cdn.jsdelivr.net" not in html_content:
        # Insert after <head>
        head_match = re.search(r'<head\b[^>]*>', html_content, re.IGNORECASE)
        if head_match:
            insert_pos = head_match.end()
            inject_str = PRECONNECT_HTML
            if is_index:
                inject_str += HERO_PRELOAD_HTML
            html_content = html_content[:insert_pos] + inject_str + html_content[insert_pos:]

    # 2. Make CSS asynchronous to solve "Render-blocking requests"
    # Find stylesheet link tags that load Bootstrap, FontAwesome, Animate, and AOS
    # E.g. <link rel="stylesheet" href="...font-awesome..." ...>
    
    # FontAwesome CSS link
    fa_regex = re.compile(r'(<link\s+[^>]*?href=["\'][^"\']*font-awesome[^"\']*["\'][^>]*?>)', re.IGNORECASE)
    def make_fa_async(match):
        tag = match.group(1)
        if 'media="print"' in tag or "media='print'" in tag:
            return tag
        # Replace or insert media and onload
        # Clean closing > or />
        tag_clean = re.sub(r'\s*/?>$', '', tag)
        return tag_clean + ' media="print" onload="this.media=\'all\'">'
    html_content = fa_regex.sub(make_fa_async, html_content)
    
    # Animate.css link
    animate_regex = re.compile(r'(<link\s+[^>]*?href=["\'][^"\']*animate\.min\.css[^"\']*["\'][^>]*?>)', re.IGNORECASE)
    def make_animate_async(match):
        tag = match.group(1)
        if 'media="print"' in tag or "media='print'" in tag:
            return tag
        tag_clean = re.sub(r'\s*/?>$', '', tag)
        return tag_clean + ' media="print" onload="this.media=\'all\'">'
    html_content = animate_regex.sub(make_animate_async, html_content)

    # AOS CSS link
    aos_regex = re.compile(r'(<link\s+[^>]*?href=["\'][^"\']*aos\.css[^"\']*["\'][^>]*?>)', re.IGNORECASE)
    def make_aos_async(match):
        tag = match.group(1)
        if 'media="print"' in tag or "media='print'" in tag:
            return tag
        tag_clean = re.sub(r'\s*/?>$', '', tag)
        return tag_clean + ' media="print" onload="this.media=\'all\'">'
    html_content = aos_regex.sub(make_aos_async, html_content)

    return html_content

def fix_body_accessibility(html_content):
    # 1. Check and fix missing width/height on <img> tags
    img_regex = re.compile(r'(<img\s+([^>]*?)src=["\']([^"\']+)["\']([^>]*?>))', re.IGNORECASE)
    
    def img_replacer(match):
        full_tag = match.group(1)
        attrs_before = match.group(2)
        src_val = match.group(3)
        attrs_after = match.group(4)
        
        # Combine attributes for checking
        combined = (attrs_before + " " + attrs_after).strip()
        combined = re.sub(r'\s+', ' ', combined)
        
        has_width = 'width=' in combined.lower()
        has_height = 'height=' in combined.lower()
        has_loading = 'loading=' in combined.lower()
        
        # If both width and height are already present, do nothing
        if has_width and has_height:
            return full_tag
            
        img_basename = os.path.basename(src_val.split('?')[0].split('#')[0])
        img_path = os.path.join(IMAGES_DIR, img_basename)
        
        width, height = None, None
        if os.path.exists(img_path):
            try:
                with Image.open(img_path) as img:
                    width, height = img.size
            except Exception:
                pass
                
        # If we couldn't get dimensions, return as is
        if not width or not height:
            return full_tag
            
        # Append missing attributes
        new_attrs = []
        if not has_width:
            new_attrs.append(f'width="{width}"')
        if not has_height:
            new_attrs.append(f'height="{height}"')
        if not has_loading:
            is_hero_or_logo = any(x in img_basename.lower() for x in ["hero", "logo", "pabitra"])
            if is_hero_or_logo:
                new_attrs.append('loading="eager"')
            else:
                new_attrs.append('loading="lazy"')
                
        # Inject new attributes
        tag_clean = re.sub(r'\s*/?>$', '', full_tag)
        return tag_clean + " " + " ".join(new_attrs) + ">"
        
    html_content = img_regex.sub(img_replacer, html_content)

    # 2. Fix empty button accessibility (aria-label)
    # Match button tags: <button ...>...</button>
    button_regex = re.compile(r'(<button\b([^>]*?)>([\s\S]*?)</button>)', re.IGNORECASE)
    
    def button_replacer(match):
        full_tag = match.group(1)
        attrs = match.group(2)
        content = match.group(3).strip()
        
        # If button has no visible text (or only icons) and no aria-label, add one
        has_aria_label = 'aria-label=' in attrs.lower()
        has_text = len(re.sub(r'<[^>]*>', '', content).strip()) > 0
        
        if not has_aria_label and not has_text:
            # Check icons inside to make a guess
            label_text = "Action Button"
            if "fa-search" in content:
                label_text = "Search website"
            elif "fa-times" in content or "close" in attrs.lower():
                label_text = "Close"
            elif "fa-bars" in content or "hamburger" in attrs.lower():
                label_text = "Open menu"
            elif "fa-chart" in content or "audit" in attrs.lower():
                label_text = "Get Free Website Audit"
            elif "fa-phone" in content:
                label_text = "Call Us"
            elif "fa-chevron" in content:
                label_text = "Scroll or navigate"
                
            return f'<button {attrs} aria-label="{label_text}">{content}</button>'
            
        return full_tag
        
    html_content = button_regex.sub(button_replacer, html_content)

    # 3. Fix <a> tags with empty or non-descriptive text (like icon only or "Read More")
    a_regex = re.compile(r'(<a\b([^>]*?href=["\']([^"\']+)["\'][^>]*?)>([\s\S]*?)</a>)', re.IGNORECASE)
    
    def a_replacer(match):
        full_tag = match.group(1)
        attrs = match.group(2)
        href = match.group(3)
        content = match.group(4).strip()
        
        has_aria_label = 'aria-label=' in attrs.lower()
        has_title = 'title=' in attrs.lower()
        visible_text = re.sub(r'<[^>]*>', '', content).strip()
        has_text = len(visible_text) > 0
        
        # Case A: Icon-only link
        if not has_aria_label and not has_title and not has_text:
            label_text = "Link"
            href_lower = href.lower()
            if "facebook" in href_lower:
                label_text = "Visit our Facebook page"
            elif "instagram" in href_lower:
                label_text = "Visit our Instagram profile"
            elif "linkedin" in href_lower:
                label_text = "Visit our LinkedIn page"
            elif "twitter" in href_lower or "x.com" in href_lower:
                label_text = "Visit our Twitter profile"
            elif "youtube" in href_lower:
                label_text = "Visit our YouTube channel"
            elif "whatsapp" in href_lower or "wa.me" in href_lower:
                label_text = "Contact us on WhatsApp"
            elif "tel:" in href_lower:
                label_text = "Call Pabitra Technology"
            elif "mailto:" in href_lower:
                label_text = "Send email to Pabitra Technology"
            elif "maps.google" in href_lower:
                label_text = "View our office on Google Maps"
            else:
                label_text = "Learn more details"
                
            return f'<a {attrs} aria-label="{label_text}">{content}</a>'
            
        # Case B: Non-descriptive text like "Read More", "Click Here"
        if not has_aria_label and has_text and visible_text.lower() in ["read more", "click here", "learn more", "more"]:
            label_text = f"Read more about our {visible_text.lower()}"
            # Guess context from href
            href_lower = href.lower()
            if "seo" in href_lower:
                label_text = "Read more about our SEO services"
            elif "web-dev" in href_lower or "web" in href_lower:
                label_text = "Read more about web development services"
            elif "app" in href_lower:
                label_text = "Read more about mobile app services"
            elif "blog" in href_lower:
                label_text = "Read more about this blog post"
            elif "contact" in href_lower:
                label_text = "Navigate to contact page"
                
            return f'<a {attrs} aria-label="{label_text}">{content}</a>'
            
        return full_tag
        
    html_content = a_regex.sub(a_replacer, html_content)
    
    # 4. Form inputs missing aria-label
    input_regex = re.compile(r'(<input\b([^>]*?)>)', re.IGNORECASE)
    
    def input_replacer(match):
        full_tag = match.group(1)
        attrs = match.group(2)
        
        has_aria_label = 'aria-label=' in attrs.lower()
        has_id = 'id=' in attrs.lower()
        type_match = re.search(r'type=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
        input_type = type_match.group(1).lower() if type_match else "text"
        
        if input_type in ["hidden", "submit", "checkbox", "radio"]:
            return full_tag
            
        # If it has no label id or aria-label, add one
        if not has_aria_label and not has_id:
            placeholder_match = re.search(r'placeholder=["\']([^"\']+)["\']', attrs, re.IGNORECASE)
            placeholder = placeholder_match.group(1) if placeholder_match else "Input field"
            return f'<input {attrs} aria-label="{placeholder}">'
            
        return full_tag
        
    html_content = input_regex.sub(input_replacer, html_content)

    return html_content

def process_file(file_path):
    is_index = os.path.basename(file_path) == "index.html"
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        orig_content = content
        
        # Fix render-blocking stylesheets, preconnects & preloads in head
        content = fix_head_elements(content, is_index)
        
        # Fix accessibility warnings in body (images, buttons, inputs, links)
        content = fix_body_accessibility(content)
        
        if content != orig_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  [Optimized] {os.path.relpath(file_path, WORKSPACE_DIR)}")
            return True
    except Exception as e:
        print(f"  Error processing {file_path}: {e}")
    return False

def main():
    print("Starting Lighthouse Performance and Accessibility Optimizer...")
    
    # 1. Optimize component template files first (header, footer, etc.)
    components_to_optimize = [
        os.path.join(WORKSPACE_DIR, "components", "header.html"),
        os.path.join(WORKSPACE_DIR, "components", "footer.html")
    ]
    for path in components_to_optimize:
        if os.path.exists(path):
            process_file(path)
            
    # 2. Optimize all HTML files
    html_files = []
    # Walk root directory
    for file in os.listdir(WORKSPACE_DIR):
        if file.endswith(".html"):
            html_files.append(os.path.join(WORKSPACE_DIR, file))
            
    # Walk html/ directory
    if os.path.exists(HTML_DIR):
        for file in os.listdir(HTML_DIR):
            if file.endswith(".html"):
                html_files.append(os.path.join(HTML_DIR, file))
                
    # Walk other directories like blog, services, solutions recursively
    for folder in ["blog", "services", "solutions", "careers", "case-studies", "contact", "faqs", "news", "partners", "privacy", "terms"]:
        folder_path = os.path.join(WORKSPACE_DIR, folder)
        if os.path.exists(folder_path):
            for root, dirs, files in os.walk(folder_path):
                for file in files:
                    if file.endswith(".html"):
                        html_files.append(os.path.join(root, file))

    optimized_count = 0
    for file_path in html_files:
        if process_file(file_path):
            optimized_count += 1
            
    print(f"\nOptimization complete! Total files updated: {optimized_count}")

if __name__ == "__main__":
    main()
