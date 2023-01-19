"use strict";
const chain = {
  tez: "tezos",
  eth: "eip155",
};

function getAddress(chain) {
  return window.flutter_inappwebview.callHandler("getAddress", {
    chain: chain,
  });
}
function sendTransaction({ transactions, sourceAddress, chain }) {
  return window.flutter_inappwebview.callHandler("sendTransaction", {
    chain: chain,
    sourceAddress: sourceAddress,
    transactions: transactions,
  });
}
function signMessage({ payload, sourceAddress, chain }) {
  return window.flutter_inappwebview.callHandler("signMessage", {
    payload: payload,
    sourceAddress: sourceAddress,
    chain: chain,
  });
}
function closeWebview() {
  return window.flutter_inappwebview.callHandler("closeWebview");
}
module.exports = {
  getAddress,
  closeWebview,
  signMessage,
  sendTransaction,
  chain,
};
