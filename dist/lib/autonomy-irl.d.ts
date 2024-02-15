import { WalletDelegateParams, WalletIncreasePaidStorageParams, WalletOriginateParams, WalletProvider, WalletTransferParams } from "@taquito/taquito";
declare global {
    interface Window {
        flutter_inappwebview: any;
    }
}
export declare class AutonomyIRL {
    constructor();
    chain: {
        tez: string;
        eth: string;
    };
    getAddress(chain: string, metadata: any, params: any): any;
    passData(type: string, data: any): any;
    sendTransaction(chain: string, sourceAddress: string, transactions: any, metadata: any): any;
    signMessage(payload: any, sourceAddress: string, chain: string, metadata: any): any;
    closeWebview(): any;
}
export declare class AUWalletProvider implements WalletProvider {
    private metadata;
    constructor(metadata: any);
    private autonomyIRL;
    private _pkh;
    getPKH(): Promise<string>;
    mapTransferParamsToWalletParams(params: () => Promise<WalletTransferParams>): Promise<{
        kind: string;
        destination: string;
        fee: string | undefined;
        amount: string;
        mutez: boolean | undefined;
        gasLimit: string | undefined;
        entrypoint: string | undefined;
        parameters: import("@taquito/rpc").MichelsonV1Expression | undefined;
        storageLimit: string | undefined;
    }>;
    mapOriginateParamsToWalletParams(params: () => Promise<WalletOriginateParams>): Promise<{
        kind: string;
        balance: string | undefined;
        fee: string | undefined;
        gasLimit: string | undefined;
        storageLimit: string | undefined;
        delegate: string | undefined;
        mutez: boolean | undefined;
        code: string | object[];
    }>;
    mapDelegateParamsToWalletParams(params: () => Promise<WalletDelegateParams>): Promise<WalletDelegateParams>;
    mapIncreasePaidStorageWalletParams(params: () => Promise<WalletIncreasePaidStorageParams>): Promise<WalletIncreasePaidStorageParams>;
    sendOperations(params: any[]): Promise<any>;
    sign(bytes: string, watermark?: Uint8Array | undefined): Promise<string>;
    getPK(): Promise<string>;
}
