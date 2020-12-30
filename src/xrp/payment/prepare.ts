import { RippleAPI } from 'ripple-lib';

export interface PreparedTransaction {
  maxLedgerVersion?: number;
  txJSON: string;
}

export async function doPrepare(
  api: RippleAPI,
  sender: string,
  destination: string,
  amount: string
): Promise<PreparedTransaction> {
  const preparedTx = await api.prepareTransaction(
    {
      TransactionType: 'Payment',
      Account: sender,
      Amount: amount,
      Destination: destination,
    },
    {
      // Expire this transaction if it doesn't execute within ~5 minutes:
      maxLedgerVersionOffset: 75,
    }
  );
  const maxLedgerVersion = preparedTx.instructions.maxLedgerVersion;
  console.log('Prepared transaction instructions:', preparedTx.txJSON);
  console.log('Transaction cost:', preparedTx.instructions.fee, 'XRP');
  console.log('Transaction expires after ledger:', maxLedgerVersion);
  return {
    maxLedgerVersion,
    txJSON: preparedTx.txJSON,
  };
}
