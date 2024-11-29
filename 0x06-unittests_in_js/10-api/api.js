const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7865;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the payment system');
});

// New endpoint for cart with regex validation
app.get('/cart/:id(\\d+)', (req, res) => {
  const cartId = req.params.id;
  res.send(`Payment methods for cart ${cartId}`);
});

// New endpoint for available payments
app.get('/available_payments', (req, res) => {
  res.json({
    payment_methods: {
      credit_cards: true,
      paypal: false
    }
  });
});

// New endpoint for login
app.post('/login', (req, res) => {
  const { userName } = req.body;
  res.send(`Welcome ${userName}`);
});

// Only listen if not being imported for testing
if (require.main === module) {
  const server = app.listen(port, () => {
    console.log(`API available on localhost port ${port}`);
  });
}

module.exports = app;
