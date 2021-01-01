import { RippleAPI } from 'ripple-lib';

interface SignResponse {
  id: string;
  blob: string;
}

export function doSign(
  api: RippleAPI,
  transaction: string,
  secret: string
): SignResponse {
  const response = api.sign(transaction, secret);
  const txID = response.id;
  const txBlob = response.signedTransaction;
  console.log('Transaction signed');
  return {
    id: txID,
    blob: txBlob,
  };
}
