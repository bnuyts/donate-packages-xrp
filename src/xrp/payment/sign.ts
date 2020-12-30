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
  console.log('Identifying hash:', txID);
  const txBlob = response.signedTransaction;
  console.log('Signed blob:', txBlob);
  return {
    id: txID,
    blob: txBlob,
  };
}
