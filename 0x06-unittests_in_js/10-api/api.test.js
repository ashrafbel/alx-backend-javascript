const { expect } = require('chai');
const request = require('supertest');
const app = require('./api');

describe('API Integration Tests', function() {
  describe('Cart page', function() {
    it('should return status 200 and correct message for valid cart ID', async function() {
      const response = await request(app)
        .get('/cart/12')
        .expect(200);

      expect(response.text).to.equal('Payment methods for cart 12');
    });

    it('should return status 404 for non-numeric cart ID', async function() {
      await request(app)
        .get('/cart/hello')
        .expect(404);
    });
  });

  describe('Available Payments', function() {
    it('should return correct payment methods object', async function() {
      const response = await request(app)
        .get('/available_payments')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).to.deep.equal({
        payment_methods: {
          credit_cards: true,
          paypal: false
        }
      });
    });
  });

  describe('Login', function() {
    it('should return welcome message with provided username', async function() {
      const response = await request(app)
        .post('/login')
        .send({ userName: 'Betty' })
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(response.text).to.equal('Welcome Betty');
    });

    it('should handle missing username', async function() {
      const response = await request(app)
        .post('/login')
        .send({})
        .set('Content-Type', 'application/json')
        .expect(200);

      expect(response.text).to.equal('Welcome undefined');
    });
  });
});
