// server.js
const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

// Create the server instance
const server = http.createServer((req, res) => {
  // Set the response header status and content type
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Send the final response body
  res.end('Hello, World!\n');
});

// Start listening for network requests
server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
