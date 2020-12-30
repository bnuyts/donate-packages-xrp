import { RippleAPI } from 'ripple-lib';

export async function doSubmit(
  api: RippleAPI,
  txBlob: string
): Promise<number> {
  const latestLedgerVersion = await api.getLedgerVersion();

  const result = await api.submit(txBlob);

  console.log('Tentative result code:', result.resultCode);
  console.log('Tentative result message:', result.resultMessage);

  // Return the earliest ledger index this transaction could appear in
  // as a result of this submission, which is the first one after the
  // validated ledger at time of submission.
  return latestLedgerVersion + 1;
}
