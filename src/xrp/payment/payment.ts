import Connection from '../services/connection';
import { doPrepare } from './prepare';
import { doSign } from './sign';
import { doSubmit } from './submit';

interface PaymentTransaction {
  earliestLedgerVersion: number;
  maxLedgerVersion?: number;
  txID: string;
}

/**
 * Combine prepare, sign and submit in one payment flow
 */
export class Payment {
  public constructor(
    private connection: Connection,
    private sender: string,
    private secret: string,
    private destination: string,
    private amount: string
  ) {}

  public async doPayment(): Promise<PaymentTransaction> {
    await this.connection.connect();
    const preparedTransaction = await doPrepare(
      this.connection.api,
      this.sender,
      this.destination,
      this.amount
    );
    const response = doSign(
      this.connection.api,
      preparedTransaction.txJSON,
      this.secret
    );
    return {
      earliestLedgerVersion: await doSubmit(this.connection.api, response.blob),
      maxLedgerVersion: preparedTransaction.maxLedgerVersion,
      txID: response.id,
    };
  }
}
