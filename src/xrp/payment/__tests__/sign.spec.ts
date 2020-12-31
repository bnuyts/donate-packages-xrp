import { RippleAPI } from 'ripple-lib';
import { stub, SinonStub } from 'sinon';
import { assert } from 'chai';
import { doSign } from '../sign';

describe('doSign', function () {
  let api: RippleAPI;
  let signStub: SinonStub;

  beforeEach(function () {
    api = new RippleAPI();
    signStub = stub(api, 'sign').returns({
      id: '1',
      signedTransaction: 'blob',
    });
  });

  it('should sign a transaction', async function () {
    const signedTransaction = doSign(api, 'transaction', 'secret');

    assert(signedTransaction.id === '1');
    assert(signedTransaction.blob === 'blob');
    assert(signStub.calledWith('transaction', 'secret'));
  });
});
