import { RippleAPI } from 'ripple-lib';

export default class Connection {
  public api: RippleAPI;

  public constructor(node: string) {
    this.api = new RippleAPI({
      server: node,
    });
  }
  //
  public connect(): Promise<void> {
    return this.api.connect();
  }
}
