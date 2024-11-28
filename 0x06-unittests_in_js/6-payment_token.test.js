const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', () => {
  it('should return a successful response when success is true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        if (response.data === 'Successful response from the API') {
          done();
        } else {
          done(new Error('Response data is incorrect'));
        }
      })
      .catch((error) => {
        done(error);
      });
  });
});
