/**
 * Simple CORS Proxy for ERPNext Level Dashboard
 *
 * This proxy allows the dashboard to communicate with ERPNext instances
 * that don't have CORS headers configured for localhost.
 *
 * Usage: node proxy.js
 * The proxy will run on http://localhost:3001
 */

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3333;

const server = http.createServer((req, res) => {
    // CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Extract target URL from request path
    // Format: /proxy/https://example.com/api/resource/...
    const match = req.url.match(/^\/proxy\/(.+)/);
    if (!match) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing target URL. Use /proxy/{target-url}' }));
        return;
    }

    const targetUrl = decodeURIComponent(match[1]);
    let parsedUrl;

    try {
        parsedUrl = new url.URL(targetUrl);
    } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid target URL' }));
        return;
    }

    // Prepare proxy request options
    const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
        path: parsedUrl.pathname + parsedUrl.search,
        method: req.method,
        headers: { ...req.headers }
    };

    // Remove headers that shouldn't be forwarded
    delete options.headers.host;
    delete options.headers.origin;
    delete options.headers.referer;

    // Make the proxy request
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    const proxyReq = protocol.request(options, (proxyRes) => {
        // Forward response headers (except CORS ones, we add our own)
        const responseHeaders = { ...proxyRes.headers };
        delete responseHeaders['access-control-allow-origin'];
        delete responseHeaders['access-control-allow-methods'];
        delete responseHeaders['access-control-allow-headers'];

        res.writeHead(proxyRes.statusCode, responseHeaders);
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
        console.error('Proxy error:', e.message);
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
    });

    // Forward request body
    req.pipe(proxyReq);
});

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║           ERPNext Level Dashboard - CORS Proxy            ║
╠═══════════════════════════════════════════════════════════╣
║  Proxy running on: http://localhost:${PORT}                 ║
║                                                           ║
║  Usage: Enable "Use CORS Proxy" in dashboard settings     ║
║                                                           ║
║  Example request:                                         ║
║  /proxy/https://your-erpnext.com/api/resource/Employee    ║
╚═══════════════════════════════════════════════════════════╝
`);
});
