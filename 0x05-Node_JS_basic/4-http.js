const http = require('http');

const app = http.createServer((req, res) => {
  // Set the response header with plain text content type
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Send the response body
  res.end('Hello Holberton School!');
});

// Server listens on port 1245
app.listen(1245, () => {
  // Optional: log that the server is running (not required by specifications)
  console.log('Server running on port 1245');
});

// Export the app as required
module.exports = app;
