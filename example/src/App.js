import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

import { AutonomyIRL } from "autonomy-irl-js";

const BlockChain = {
  Ethereum: "eip155",
  Tezos: "tezos",
}

function App() {
  const autonomyIRL = new AutonomyIRL();
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [signMessageHash, setSignMessageHash] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const signMessageText = "Feral File App sign message";
  const metadata = {
    name: "Feral File App",
    url: "https://feralfile.com",
    icons: ["https://feralfile.com/assets/FeralFile.png"],
    description: "Feral File App",
  };

  function resetData() {
    setAddress("");
    setSignMessageHash("");
    setTransactionID("");
    setError("");
  }

  function toHex(str) {
    var hex = "";
    for (var i = 0; i < str.length; i++) {
      hex += "" + str.charCodeAt(i).toString(16);
    }
    return hex;
  }

  async function _getAddress(blockChain){
    try {
      var result = await autonomyIRL.getAddress(blockChain, {}, {});
      return result.result;
    } catch (error) {
      return error;
    }
  }

  async function getAddress(blockChain) {
    try {
      resetData();
      var address = await _getAddress(blockChain);
      setAddress(address);
    } catch (err) {
      setError(err);
    }
  }

  async function signMessage(payload, chain, metadata) {
    try {
      resetData();
      var address = await _getAddress(chain);
      setAddress(address);
      var signHash = await autonomyIRL.signMessage(toHex(payload.toString()), address, chain, metadata);
      setSignMessageHash(signHash.result);
    } catch (err) {
      setError(err);
    }
  }
  function closeWebview() {
    autonomyIRL.closeWebview();
  }


  async function sendETH() {
    try {
      const address = await _getAddress(BlockChain.Ethereum);
      setAddress(address);
      const tx = {
        from: address,
        to: address,
        gas: "0xb00a",
        value: "5000000000000000",
        data: "0xd0e30db0",
      };

      const result = await autonomyIRL.sendTransaction(
        BlockChain.Ethereum.toString(),
        address,
        [tx],
        metadata
      );
      setTransactionID(result.result);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="info">
          { address && address !== "" && <p>Your selected: {address}</p> }
          { signMessageHash && signMessageHash !== "" && <p>Your signed message: {signMessageHash}</p> }
          { transactionID && transactionID !== "" && <p>Your transaction ID: {transactionID}</p> }
          { error && error !== "" && <p>Error: {error}</p> }
        </div>
        <div className="action-container">
          <button onClick={() => getAddress(BlockChain.Ethereum)}>Get Ethereum Address</button>
        </div>
        <div className="action-container">
          <button onClick={() => getAddress(BlockChain.Tezos)}>Get Tezos Address</button>
        </div>
        <div className="action-container">
          <button onClick={() => sendETH()}>Send eth transaction</button>
        </div>
        <div className="action-container">
          <button onClick={() => signMessage(signMessageText, BlockChain.Ethereum, metadata)}>Ethereum sign message</button>
        </div>
        <div className="action-container">
          <button onClick={() => signMessage(signMessageText, BlockChain.Tezos, metadata)}>Tezos sign message</button>
        </div>
        <div className="action-container">
          <button onClick={() => closeWebview()}>Close Webview</button>
        </div>
      </header>
    </div>
  );
}

export default App;
