"use strict";
const chain = {
  tez: "tezos",
  eth: "eip155",
};

// metadata: {
//   name: "",
//   description: "",
//   url: "",
//   icons: [],
// },

function getAddress({ chain, params, metadata }) {
  return window.flutter_inappwebview.callHandler("getAddress", {
    chain: chain,
    params: params,
    metadata: metadata,
  });
}

function sendTransaction({ transactions, sourceAddress, chain, metadata }) {
  return window.flutter_inappwebview.callHandler("sendTransaction", {
    chain: chain,
    sourceAddress: sourceAddress,
    transactions: transactions,
    metadata: metadata,
  });
}
function signMessage({ payload, sourceAddress, chain, metadata }) {
  return window.flutter_inappwebview.callHandler("signMessage", {
    payload: payload,
    sourceAddress: sourceAddress,
    chain: chain,
    metadata: metadata,
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
