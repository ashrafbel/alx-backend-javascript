const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', function() {
    let calculateNumberSpy;

    beforeEach(function() {
        calculateNumberSpy = sinon.spy(Utils, 'calculateNumber');
    });

    afterEach(function() {
        calculateNumberSpy.restore();
    });

    it('should use Utils.calculateNumber with correct arguments', function() {
        sendPaymentRequestToApi(100, 20);

        expect(calculateNumberSpy.calledOnce).to.be.true;

        expect(calculateNumberSpy.calledWith('SUM', 100, 20)).to.be.true;
    });
});
