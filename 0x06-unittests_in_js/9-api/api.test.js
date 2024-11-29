const { expect } = require('chai');
const request = require('supertest');
const app = require('./api');

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

  it('should return status 404 for cart ID with mixed characters', async function() {
    await request(app)
      .get('/cart/123hello')
      .expect(404);
  });

  it('should return status 404 for decimal cart ID', async function() {
    await request(app)
      .get('/cart/12.34')
      .expect(404);
  });
});
