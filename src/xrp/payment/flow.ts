import Connection from '../services/connection';
import { Payment } from './payment';

export function paymentFlow(
  node: string,
  sender: string,
  secret: string,
  destination: string,
  amount: string,
  validate: boolean
) {
  const connection = new Connection(node);
  const payment = new Payment(
    connection,
    sender,
    secret,
    destination,
    connection.api.xrpToDrops(amount)
  );
  payment.doPayment().then((result) => {
    if (validate === true) {
      const validate = async (ledger: { ledgerVersion: number }) => {
        console.log('Ledger version', ledger.ledgerVersion, 'was validated.');
        if (
          result.maxLedgerVersion != null &&
          ledger.ledgerVersion > result.maxLedgerVersion
        ) {
          console.log(
            "If the transaction hasn't succeeded by now, it's expired"
          );
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
          process.exit();
        } catch (error) {
          console.log("Couldn't get transaction outcome:", error);
        }
      };
      connection.api.on('ledger', validate);
    } else {
      process.exit();
    }
  });
}
