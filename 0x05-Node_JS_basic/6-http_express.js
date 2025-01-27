const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
