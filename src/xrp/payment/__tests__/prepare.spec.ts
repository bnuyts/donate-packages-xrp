import { RippleAPI } from 'ripple-lib';
import { stub } from 'sinon';
import { assert } from 'chai';
import { doPrepare } from '../prepare';

describe('doPrepare', function () {
  let api: RippleAPI;

  beforeEach(function () {
    api = new RippleAPI();
    stub(api, 'prepareTransaction').returns(
      Promise.resolve({
        txJSON: 'txJSON',
        instructions: { fee: '1', maxLedgerVersion: 1 },
      })
    );
  });

  it('should prepare a transaction', async function () {
    const preparedTransaction = await doPrepare(
      api,
      'sender',
      'destination',
      '1'
    );

    assert(preparedTransaction.maxLedgerVersion === 1);
    assert(preparedTransaction.txJSON === 'txJSON');
  });
});
