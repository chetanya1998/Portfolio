const http = require('http');
http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      console.log('--- BROWSER ERROR ---');
      console.log(body);
      res.end('ok');
    });
  }
}).listen(9999);
console.log('Error logger listening on 9999');
