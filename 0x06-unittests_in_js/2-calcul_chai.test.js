const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber', function () {
    describe('SUM', function () {
        it('should return 6 when passing (1.4, 4.5)', function () {
            expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
        });
    });

    describe('SUBTRACT', function () {
        it('should return -4 when passing (1.4, 4.5)', function () {
            expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
        });
    });

    describe('DIVIDE', function () {
        it('should return 0.2 when passing (1.4, 4.5)', function () {
            expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
        });

        it('should return "Error" when passing (1.4, 0)', function () {
            expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
        });
    });

    describe('Invalid operation type', function () {
        it('should throw an error when passing an unknown operation', function () {
            expect(() => calculateNumber('MULTIPLY', 1.4, 4.5)).to.throw(/Invalid operation type/);
        });
    });
});
