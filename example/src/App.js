import logo from "./logo.svg";
import "./App.css";

// import autonomyIRL from "autonomy-irl-js";
// get an address by blockchain
// blockchain = "Tezos" => get tez address
// blockchain = "Ethereum" => get eth address
function getAddress(blockChain) {
  _getAddress(blockChain).then((value) => {
    alert(value);
  });
}

async function _getAddress(blockChain){
  var result = await window.flutter_inappwebview.callHandler("getAddress", {
    chain: blockChain,
  });
  return result.result;
}

function signMessage(payload, chain, metadata) {
  console.log("signMessage");
  _getAddress("eip155").then((value) => {
    window.flutter_inappwebview.callHandler("signMessage", {
      payload: payload,
      sourceAddress: value,
      chain: chain,
      metadata: metadata,
    }).then((value) => {
      alert(value.result);
    });
  });
  
}
function closeWebview() {
  window.flutter_inappwebview.callHandler("closeWebview");
}


function testEth() {
  _getAddress("eip155").then((value) => {
  var address = value;
    var tx = {
      "from": address,
      "to": address,
    }
    var metadata = {
      "name": "test",
      "url": "#",
      "icons": [""]
    };
    console.log(value);
    window.flutter_inappwebview.callHandler("sendTransaction", {
      chain: "eip155",
      sourceAddress: address,
      transactions: [tx],
      metadata: metadata,
    }).then((value) => {
      alert(value.result);
    });
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => getAddress("eip155")}> Get Ethereum Address</button>
        <br></br>
        <button onClick={() => testEth()}> Send eth transaction</button>
        <br></br>
        <button onClick={() => signMessage("1234567890", "eip155", {"name":"test"})}> Ethereum sign message</button>
        <br></br>
        <button onClick={() => closeWebview()}> Close Webview</button>
      </header>
    </div>
  );
}

export default App;
