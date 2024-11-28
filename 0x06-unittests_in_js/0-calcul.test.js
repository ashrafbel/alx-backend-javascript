const assert = require('assert');
const calculateNumber = require('./0-calcul.js');

describe('calculateNumber', function () {
  it('should return 4 when inputs are 1 and 3', function () {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should round numbers correctly and return 5', function () {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it('should round both inputs correctly and return 5', function () {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
  });

  it('should round both inputs and return 6 when inputs are 1.5 and 3.7', function () {
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });
});
