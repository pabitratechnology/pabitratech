import os
import re
import shutil
import urllib.parse
from PIL import Image

# --- CONFIGURATION ---
WORKSPACE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
IMAGES_DIR = os.path.join(WORKSPACE_DIR, "images")
BACKUP_DIR = os.path.join(WORKSPACE_DIR, "images_backup")
HTML_DIR = os.path.join(WORKSPACE_DIR, "html")
COMPONENTS_DIR = os.path.join(WORKSPACE_DIR, "components")
CSS_DIR = os.path.join(WORKSPACE_DIR, "CSS")

# Create backup directory if it doesn't exist
os.makedirs(BACKUP_DIR, exist_ok=True)

# Helper to sanitize output filename (e.g. replace spaces and special characters with underscores)
def sanitize_filename(filename):
    name, ext = os.path.splitext(filename)
    # Replace spaces, parentheses, special characters with underscores
    clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', name)
    # Replace multiple underscores with single underscore
    clean_name = re.sub(r'_+', '_', clean_name).strip('_')
    return clean_name + ".webp"

# Category rules: returns target (max_width, quality)
def get_target_rules(filename):
    filename_lower = filename.lower()
    # 1. Avatars/Team members (need to be small)
    if any(x in filename_lower for x in ["avatar", "priyanka", "subhendu", "pradyumn", "sibuna"]):
        return 300, 80
    # 2. Logos (need to stay crisp)
    elif "pabitra" in filename_lower:
        return 500, 90
    # 3. Heros & large background graphics
    elif any(x in filename_lower for x in ["hero", "about", "bg", "smo", "seo", "banner", "world-map"]):
        return 1920, 82
    # 4. Standard illustrations/images
    else:
        return 1200, 82

# --- STEP 1: OPTIMIZE IMAGES AND BUILD FILE MAP ---
filename_map = {}
total_original_size = 0
total_new_size = 0

print("Scanning images for optimization...")
for root, dirs, files in os.walk(IMAGES_DIR):
    # Only process files in the root of the images/ folder (skip subdirectories)
    if root != IMAGES_DIR:
        continue
        
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext not in [".jpg", ".jpeg", ".png"]:
            continue
            
        src_path = os.path.join(IMAGES_DIR, file)
        clean_name = sanitize_filename(file)
        dest_path = os.path.join(IMAGES_DIR, clean_name)
        
        orig_size = os.path.getsize(src_path)
        total_original_size += orig_size
        
        max_width, quality = get_target_rules(file)
        
        success = False
        try:
            with Image.open(src_path) as img:
                orig_width, orig_height = img.size
                
                # Handle transparency for PNGs
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    # Keep RGBA mode
                    pass
                else:
                    img = img.convert('RGB')
                
                # Resize if width exceeds max_width
                if orig_width > max_width:
                    ratio = max_width / float(orig_width)
                    new_height = int(float(orig_height) * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                    print(f"  [Resize] {file} -> {clean_name} ({orig_width}x{orig_height} to {max_width}x{new_height})")
                else:
                    print(f"  [Compress] {file} -> {clean_name} ({orig_width}x{orig_height})")
                    
                img.save(dest_path, 'WEBP', quality=quality)
                success = True
        except Exception as e:
            print(f"  Error processing {file}: {e}")
            
        if success:
            new_size = os.path.getsize(dest_path)
            total_new_size += new_size
            
            # Record mapping
            filename_map[file] = clean_name
            # Also record URL encoded mapping (e.g. spaces replaced by %20)
            url_encoded = urllib.parse.quote(file)
            if url_encoded != file:
                filename_map[url_encoded] = clean_name
                
            # Move original file to backup directory
            backup_path = os.path.join(BACKUP_DIR, file)
            if os.path.exists(backup_path):
                os.remove(backup_path) # Overwrite existing backup if running again
            shutil.move(src_path, backup_path)

print(f"\nImage optimization complete!")
print(f"Original Total: {total_original_size / (1024*1024):.2f} MB")
print(f"Optimized Total: {total_new_size / (1024*1024):.2f} MB")
print(f"Savings: {(total_original_size - total_new_size) / (1024*1024):.2f} MB ({(total_original_size - total_new_size) / (total_original_size + 1e-9) * 100:.1f}% reduction)\n")

# --- STEP 2: PARSE HTML IMG TAGS AND INJECT METADATA ---
def process_html_img_tags(html_content):
    # Regex to find <img ...> tags
    img_tag_regex = re.compile(r'(<img\s+([^>]*?)src=["\']([^"\']+)["\']([^>]*?)>)', re.IGNORECASE)
    
    def replacer(match):
        full_tag = match.group(1)
        attrs_before = match.group(2)
        src_val = match.group(3)
        attrs_after = match.group(4)
        
        # Extract the image filename
        # Handles paths like /images/name.webp, ../images/name.webp, name.webp
        img_basename = os.path.basename(src_val.split('?')[0].split('#')[0])
        img_path = os.path.join(IMAGES_DIR, img_basename)
        
        if not os.path.exists(img_path):
            return full_tag
            
        try:
            with Image.open(img_path) as img:
                width, height = img.size
        except Exception:
            return full_tag
            
        # Combine attributes before and after
        combined_attrs = (attrs_before + " " + attrs_after).strip()
        # Clean multiple spaces
        combined_attrs = re.sub(r'\s+', ' ', combined_attrs)
        
        # Check existing attributes
        has_width = 'width=' in combined_attrs.lower()
        has_height = 'height=' in combined_attrs.lower()
        has_loading = 'loading=' in combined_attrs.lower()
        has_alt = 'alt=' in combined_attrs.lower()
        
        new_attributes = []
        
        # Fix CLS: Set width and height if both are missing
        if not has_width and not has_height:
            new_attributes.append(f'width="{width}"')
            new_attributes.append(f'height="{height}"')
            
        # Fix LCP/TBT: Set loading lazy/eager
        if not has_loading:
            is_hero_or_logo = any(x in img_basename.lower() for x in ["hero", "logo", "pabitra"])
            if is_hero_or_logo:
                new_attributes.append('loading="eager"')
            else:
                new_attributes.append('loading="lazy"')
                
        # Fix SEO: Set alt tag
        if not has_alt:
            name_without_ext = os.path.splitext(img_basename)[0]
            clean_alt = name_without_ext.replace('_', ' ').replace('-', ' ').title()
            new_attributes.append(f'alt="{clean_alt}"')
            
        # Reconstruct the tag
        if new_attributes:
            # Reinsert src attribute at the front of attributes for cleanliness
            other_attrs = re.sub(r'src=["\'][^"\']+["\']', '', combined_attrs).strip()
            other_attrs = re.sub(r'\s+', ' ', other_attrs)
            
            new_attrs_str = " ".join(new_attributes)
            if other_attrs:
                return f'<img src="{src_val}" {other_attrs} {new_attrs_str}>'
            else:
                return f'<img src="{src_val}" {new_attrs_str}>'
                
        return full_tag

    return img_tag_regex.sub(replacer, html_content)

# --- STEP 3: SCAN FILES AND REWRITE REFERENCES ---
print("Rewriting image references and updating HTML metadata...")

# Find all HTML and CSS files recursively
files_to_update = []
blacklist_dirs = ["node_modules", "images_backup", ".git", ".github"]

for root, dirs, files in os.walk(WORKSPACE_DIR):
    # Filter out blacklisted directories
    dirs[:] = [d for d in dirs if d not in blacklist_dirs]
    
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in [".html", ".css"]:
            files_to_update.append(os.path.join(root, file))

updated_files_count = 0

for file_path in files_to_update:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        original_content = content
        
        # Replace old image references with optimized WebP filenames
        for orig, new_webp in filename_map.items():
            # Match the exact file name (e.g. hero image.png or hero%20image.png)
            content = content.replace(orig, new_webp)
            
        # If it is an HTML file, process img tags to inject width, height, loading, alt
        if file_path.endswith(".html"):
            content = process_html_img_tags(content)
            
        # If content changed, save it
        if content != original_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            rel_path = os.path.relpath(file_path, WORKSPACE_DIR)
            print(f"  [Updated] {rel_path}")
            updated_files_count += 1
            
    except Exception as e:
        print(f"  Error updating file {file_path}: {e}")

print(f"\nFile references updated! Total files modified: {updated_files_count}")

# --- STEP 4: ADD IMAGES_BACKUP TO .GITIGNORE ---
gitignore_path = os.path.join(WORKSPACE_DIR, ".gitignore")
if os.path.exists(gitignore_path):
    with open(gitignore_path, "r", encoding="utf-8") as f:
        git_content = f.read()
    if "images_backup/" not in git_content:
        with open(gitignore_path, "a", encoding="utf-8") as f:
            f.write("\n# Image optimization backup folder\nimages_backup/\n")
        print("Added images_backup/ to .gitignore")
