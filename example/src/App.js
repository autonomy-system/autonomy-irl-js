import logo from "./logo.svg";
import "./App.css";

import autonomyIRL from "autonomy-irl-js";
// get an address by blockchain
// blockchain = "Tezos" => get tez address
// blockchain = "Ethereum" => get eth address
function getAddress(blockChain) {
  autonomyIRL.getAddress(blockChain).then((value) => {
    alert(value);
  });
}
function closeWebview() {
  autonomyIRL.closeWebview();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => getAddress("Tezos")}> Get Address</button>
        <br></br>
        <button onClick={() => closeWebview()}> Close Webview</button>
      </header>
    </div>
  );
}

export default App;
