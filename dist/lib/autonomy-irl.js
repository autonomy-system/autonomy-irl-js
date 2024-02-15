"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUWalletProvider = exports.AutonomyIRL = void 0;
class AutonomyIRL {
    constructor() {
        this.chain = {
            tez: "tezos",
            eth: "eip155",
        };
    }
    getAddress(chain, metadata, params) {
        return window.flutter_inappwebview.callHandler("getAddress", {
            chain: chain,
            metadata: metadata,
            params: params,
        });
    }
    passData(type, data) {
        return window.flutter_inappwebview.callHandler("passData", {
            type: type,
            data: data,
        });
    }
    sendTransaction(chain, sourceAddress, transactions, metadata) {
        console.log(JSON.stringify({
            chain: chain,
            sourceAddress: sourceAddress,
            transactions: transactions,
            metadata: metadata,
        }));
        return window.flutter_inappwebview.callHandler("sendTransaction", {
            chain: chain,
            sourceAddress: sourceAddress,
            transactions: transactions,
            metadata: metadata,
        });
    }
    signMessage(payload, sourceAddress, chain, metadata) {
        return window.flutter_inappwebview.callHandler("signMessage", {
            payload: payload,
            sourceAddress: sourceAddress,
            chain: chain,
            metadata: metadata,
        });
    }
    closeWebview() {
        return window.flutter_inappwebview.callHandler("closeWebview");
    }
}
exports.AutonomyIRL = AutonomyIRL;
class AUWalletProvider {
    constructor(metadata) {
        this.metadata = metadata;
        this.autonomyIRL = new AutonomyIRL();
        this._pkh = "";
    }
    getPKH() {
        return __awaiter(this, void 0, void 0, function* () {
            var value = yield this.autonomyIRL.getAddress(this.autonomyIRL.chain.tez, this.metadata, null);
            if (value.result != null) {
                this._pkh = value.result;
            }
            return value.result;
        });
    }
    mapTransferParamsToWalletParams(params) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            let op = yield params();
            return {
                kind: "transaction",
                destination: op.to,
                fee: (_a = op.fee) === null || _a === void 0 ? void 0 : _a.toString(),
                amount: op.amount.toString(),
                mutez: op.mutez,
                gasLimit: (_b = op.gasLimit) === null || _b === void 0 ? void 0 : _b.toString(),
                entrypoint: (_c = op.parameter) === null || _c === void 0 ? void 0 : _c.entrypoint,
                parameters: (_d = op.parameter) === null || _d === void 0 ? void 0 : _d.value,
                storageLimit: (_e = op.storageLimit) === null || _e === void 0 ? void 0 : _e.toString(),
            };
        });
    }
    mapOriginateParamsToWalletParams(params) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            let op = yield params();
            return {
                kind: "origination",
                balance: (_a = op.balance) === null || _a === void 0 ? void 0 : _a.toString(),
                fee: (_b = op.fee) === null || _b === void 0 ? void 0 : _b.toString(),
                gasLimit: (_c = op.gasLimit) === null || _c === void 0 ? void 0 : _c.toString(),
                storageLimit: (_d = op.storageLimit) === null || _d === void 0 ? void 0 : _d.toString(),
                delegate: op.delegate,
                mutez: op.mutez,
                code: op.code,
            };
        });
    }
    mapDelegateParamsToWalletParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return params();
        });
    }
    mapIncreasePaidStorageWalletParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return params();
        });
    }
    sendOperations(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.autonomyIRL.sendTransaction(this.autonomyIRL.chain.tez, this._pkh, params, this.metadata);
            return value.result;
        });
    }
    sign(bytes, watermark) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.autonomyIRL.signMessage(bytes, this._pkh, this.autonomyIRL.chain.tez, this.metadata);
            return value.result;
        });
    }
    getPK() {
        throw new Error("Method not implemented yet.");
    }
}
exports.AUWalletProvider = AUWalletProvider;
