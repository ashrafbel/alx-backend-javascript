const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', function () {
    describe('SUM', function () {
        it('should return 6 when passing (1.4, 4.5)', function () {
            assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
        });
    });

    describe('SUBTRACT', function () {
        it('should return -4 when passing (1.4, 4.5)', function () {
            assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
        });
    });

    describe('DIVIDE', function () {
        it('should return 0.2 when passing (1.4, 4.5)', function () {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
        });

        it('should return "Error" when passing (1.4, 0)', function () {
            assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
        });
    });

    describe('Invalid operation type', function () {
        it('should throw an error when passing an unknown operation', function () {
            assert.throws(() => calculateNumber('MULTIPLY', 1.4, 4.5), /Invalid operation type/);
        });
    });
});
