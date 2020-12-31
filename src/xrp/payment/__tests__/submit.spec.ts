import { RippleAPI } from 'ripple-lib';
import { stub, SinonStub } from 'sinon';
import { assert } from 'chai';
import { doSubmit } from '../submit';

describe('doSubmit', function () {
  let api: RippleAPI;
  let submitStub: SinonStub;

  beforeEach(function () {
    api = new RippleAPI();
    stub(api, 'getLedgerVersion').returns(Promise.resolve(1));
    submitStub = stub(api, 'submit').returns(
      Promise.resolve({
        resultCode: 'resultCode',
        resultMessage: 'resultMessage',
      })
    );
  });

  it('should return latestLedgerVersion + 1 when submitting a transaction', async function () {
    const ledgerVersion = await doSubmit(api, 'blob');

    assert(ledgerVersion === 2);
    assert(submitStub.calledWith('blob'));
  });
});
