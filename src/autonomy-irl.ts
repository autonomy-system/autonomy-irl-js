import {
  WalletDelegateParams,
  WalletIncreasePaidStorageParams,
  WalletOriginateParams,
  WalletProvider,
  WalletTransferParams,
} from "@taquito/taquito";

declare global {
  interface Window {
    flutter_inappwebview: any;
  }
}

export class AutonomyIRL {
  constructor() {}
  chain = {
    tez: "tezos",
    eth: "eip155",
  };

  public getAddress(chain: string, metadata: any, params: any) {
    return window.flutter_inappwebview.callHandler("getAddress", {
      chain: chain,
      metadata: metadata,
      params: params,
    });
  }

  public sendTransaction(
    chain: string,
    sourceAddress: string,
    transactions: any,
    metadata: any
  ) {
    console.log(
      JSON.stringify({
        chain: chain,
        sourceAddress: sourceAddress,
        transactions: transactions,
        metadata: metadata,
      })
    );
    return window.flutter_inappwebview.callHandler("sendTransaction", {
      chain: chain,
      sourceAddress: sourceAddress,
      transactions: transactions,
      metadata: metadata,
    });
  }

  public signMessage(
    payload: any,
    sourceAddress: string,
    chain: string,
    metadata: any
  ) {
    return window.flutter_inappwebview.callHandler("signMessage", {
      payload: payload,
      sourceAddress: sourceAddress,
      chain: chain,
      metadata: metadata,
    });
  }

  public closeWebview() {
    return window.flutter_inappwebview.callHandler("closeWebview");
  }
}

export class AUWalletProvider implements WalletProvider {
  constructor(private metadata: any) {
    this.autonomyIRL = new AutonomyIRL();
    this._pkh = "";
  }
  private autonomyIRL: AutonomyIRL;

  private _pkh: string;

  async getPKH(): Promise<string> {
    var value = await this.autonomyIRL.getAddress(
      this.autonomyIRL.chain.tez,
      this.metadata,
      null
    );
    if (value.result != null) {
      this._pkh = value.result;
    }
    return value.result;
  }

  async mapTransferParamsToWalletParams(
    params: () => Promise<WalletTransferParams>
  ) {
    let op = await params();
    return {
      kind: "transaction",
      destination: op.to,
      fee: op.fee?.toString(),
      amount: op.amount.toString(),
      mutez: op.mutez,
      gasLimit: op.gasLimit?.toString(),
      entrypoint: op.parameter?.entrypoint,
      parameters: op.parameter?.value,
      storageLimit: op.storageLimit?.toString(),
    };
  }

  async mapOriginateParamsToWalletParams(
    params: () => Promise<WalletOriginateParams>
  ) {
    let op = await params();
    return {
      kind: "origination",
      balance: op.balance?.toString(),
      fee: op.fee?.toString(),
      gasLimit: op.gasLimit?.toString(),
      storageLimit: op.storageLimit?.toString(),
      delegate: op.delegate,
      mutez: op.mutez,
      code: op.code,
    };
  }

  async mapDelegateParamsToWalletParams(
    params: () => Promise<WalletDelegateParams>
  ) {
    return params();
  }

  async mapIncreasePaidStorageWalletParams(
    params: () => Promise<WalletIncreasePaidStorageParams>
  ) {
    return params();
  }

  async sendOperations(params: any[]) {
    const value = await this.autonomyIRL.sendTransaction(
      this.autonomyIRL.chain.tez,
      this._pkh,
      params,
      this.metadata
    );
    return value.result;
  }


  sign(bytes: string, watermark?: Uint8Array | undefined): Promise<string> {
    throw new Error("Method not implemented.");
  }

  getPK(): Promise<string> {
    return Promise.resolve("");
  }

}
