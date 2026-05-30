const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    // Parse the pathname and remove query/hash values
    const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const decodedPath = decodeURIComponent(requestUrl.pathname);

    // Resolve local path from clean URL structure
    let relativePath = decodedPath === '/' ? 'index.html' : decodedPath.slice(1);
    if (relativePath.endsWith('/')) {
        relativePath = path.join(relativePath, 'index.html');
    }
    let filePath = path.join(__dirname, relativePath);

    // If path is a folder, check for index.html inside it
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
    } catch (e) {}

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end('Not Found: ' + relativePath);
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error: ' + err.code);
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
