const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

app.get('/cart/:id', (req, res) => {
  const { id } = req.params;
  if (/^\d+$/.test(id)) {
    res.status(200).send(`Payment methods for cart ${id}`);
  } else {
    res.status(404).send('Not Found');
  }
});

if (require.main === module) {
  app.listen(7865, () => {
    console.log('API available on localhost port 7865');
  });
}

module.exports = app;
