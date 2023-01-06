"use strict";

module.exports = {
  getAddress,
  closeWebview,
};

function getAddress(blockchain) {
  return window.flutter_inappwebview.callHandler("getAddress", {
    block_chain: blockchain,
  });
}
function closeWebview() {
  return window.flutter_inappwebview.callHandler("closeWebview");
}
