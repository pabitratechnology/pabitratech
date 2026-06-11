import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Override the directory path to serve from workspace root
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Translate requested path to local filepath
        path = self.translate_path(self.path)
        
        # If requested path is a directory and doesn't end with slash, let standard handler redirect
        if os.path.isdir(path):
            return super().do_GET()
            
        # If the requested file does not exist, serve the custom 404.html
        if not os.path.exists(path):
            custom_404_path = os.path.join(DIRECTORY, '404.html')
            if os.path.exists(custom_404_path):
                self.send_response(404)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.end_headers()
                with open(custom_404_path, 'rb') as f:
                    self.wfile.write(f.read())
                return
            
        return super().do_GET()

handler = CustomHTTPRequestHandler

# Allow reusing address to prevent "address already in use" errors during quick restarts
socketserver.TCPServer.allow_reuse_address = True

print(f"Starting custom development server on port {PORT}...")
print(f"Serving files from: {DIRECTORY}")
print("Custom 404 error routing enabled (redirecting non-existent paths to /404.html)")

try:
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nStopping server.")
    sys.exit(0)
except Exception as e:
    print(f"Server error: {e}")
    sys.exit(1)
