import Connection from '../services/connection';
import { Payment } from './payment';

export async function paymentFlow(
  node: string,
  sender: string,
  secret: string,
  destination: string,
  amount: string,
  validate: boolean
): Promise<void> {
  let paymentFlowCompletion: (value: void | PromiseLike<void>) => void;
  const paymentFlowCompletionPromise = new Promise<void>((resolve) => {
    paymentFlowCompletion = resolve;
  });

  const connection = new Connection(node);
  const payment = new Payment(
    connection,
    sender,
    secret,
    destination,
    connection.api.xrpToDrops(amount)
  );
  const result = await payment.doPayment();
  if (validate === true) {
    const validate = async (ledger_1: { ledgerVersion: number }) => {
      console.log('Ledger version', ledger_1.ledgerVersion, 'was validated.');
      if (
        result.maxLedgerVersion != null &&
        ledger_1.ledgerVersion > result.maxLedgerVersion
      ) {
        console.log("If the transaction hasn't succeeded by now, it's expired");
      }
      try {
        const tx = await connection.api.getTransaction(result.txID, {
          minLedgerVersion: result.earliestLedgerVersion,
        });
        console.log('Transaction result:', tx.outcome.result);
        console.log(
          'Balance changes:',
          JSON.stringify(tx.outcome.balanceChanges)
        );
        connection.api.removeListener('ledger', validate);
        paymentFlowCompletion();
      } catch (error) {
        console.log("Couldn't get transaction outcome:", error);
      }
    };
    connection.api.on('ledger', validate);
  } else {
    return Promise.resolve();
  }
  return paymentFlowCompletionPromise;
}
