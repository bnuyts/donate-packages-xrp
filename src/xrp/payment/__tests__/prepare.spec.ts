import { RippleAPI } from 'ripple-lib';
import sinon from 'sinon';
import chai from 'chai';
import { doPrepare } from '../prepare';

describe('doPrepare', function () {
  it('should prepare a transaction', async function () {
    const api = new RippleAPI();
    sinon.stub(api, 'prepareTransaction').returns(
      Promise.resolve({
        txJSON: 'txJSON',
        instructions: { fee: '1', maxLedgerVersion: 1 },
      })
    );

    const preparedTransaction = await doPrepare(
      api,
      'sender',
      'destination',
      '1'
    );

    chai.assert(preparedTransaction.maxLedgerVersion === 1);
    chai.assert(preparedTransaction.txJSON === 'txJSON');
  });
});
