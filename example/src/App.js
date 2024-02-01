import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

import { AUWalletProvider, AutonomyIRL } from "autonomy-irl-js";
import { OpKind, TezosToolkit } from "@taquito/taquito";

const tezosRPCNode = 'https://ghostnet.ecadinfra.com';

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
      const result = await autonomyIRL.getAddress(blockChain, {}, {});
      return result.result;
    } catch (error) {
      return error;
    }
  }

  async function getAddress(blockChain) {
    try {
      resetData();
      const address = await _getAddress(blockChain);
      setAddress(address);
    } catch (err) {
      setError(err);
    }
  }

  async function signMessage(payload, chain, metadata) {
    try {
      resetData();
      const address = await _getAddress(chain);
      setAddress(address);
      const signHash = await autonomyIRL.signMessage(toHex(payload.toString()), address, chain, metadata);
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
      const address = await _getAddress(autonomyIRL.chain.eth);
      setAddress(address);
      const tx = {
        from: address,
        to: address,
        gas: "0xb00a",
        value: "5000000000000000",
        data: "0xd0e30db0",
      };

      const result = await autonomyIRL.sendTransaction(
        autonomyIRL.chain.eth,
        address,
        [tx],
        metadata
      );
      setTransactionID(result.result);
    } catch (error) {
      alert(error);
    }
  }

  async function sendTezos() {
    try {
      const address = await _getAddress(autonomyIRL.chain.tez);
      setAddress(address);
      const ops = [];
      ops.push({
        kind: OpKind.TRANSACTION,
        amount: "1000000",
        destination: address,
      });

      const result = await autonomyIRL.sendTransaction(
        autonomyIRL.chain.tez,
        address,
        ops,
        metadata
      );
      setTransactionID(result.result);
    } catch (error) {
      alert(error);
    }
  }

  async function callGetPKHProvider() {
    try {
      const tezos = new TezosToolkit(tezosRPCNode);
      const auWalletProvider = new AUWalletProvider(metadata);
      tezos.setProvider({ wallet: auWalletProvider });
      const address = await auWalletProvider.getPKH();
      setAddress(address);
    } catch (error) {
      alert(error);
    }
  }

  async function callSignMessageProvider() {
    try {
      const tezos = new TezosToolkit(tezosRPCNode);
      const auWalletProvider = new AUWalletProvider(metadata);
      tezos.setProvider({ wallet: auWalletProvider });
      const address = await auWalletProvider.getPKH();
      setAddress(address);
      const signHash = await auWalletProvider.sign(toHex(signMessageText), address);
      setSignMessageHash(signHash);
    } catch (error) {
      alert(error);
    }
  }

  async function callSendOperationProvider() {
    try {
      const tezos = new TezosToolkit(tezosRPCNode);
      const aUWalletProvider = new AUWalletProvider(metadata);
      tezos.setProvider({ wallet: aUWalletProvider });
      const address = await aUWalletProvider.getPKH();
      setAddress(address);
      const ops = [];
      ops.push({
        kind: OpKind.TRANSACTION,
        amount: "1200000",
        destination: address,
      });

      const result = await aUWalletProvider.sendOperations(ops);
      setTransactionID(result);
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
          <button onClick={() => getAddress(autonomyIRL.chain.eth)}>Get Ethereum Address</button>
        </div>
        <div className="action-container">
          <button onClick={() => getAddress(autonomyIRL.chain.tez)}>Get Tezos Address</button>
        </div>
        <div className="action-container">
          <button onClick={() => sendETH()}>Send eth transaction</button>
        </div>
        <div className="action-container">
          <button onClick={() => sendTezos()}>Send 1 Tezos</button>
        </div>
        <div className="action-container">
          <button onClick={() => signMessage(signMessageText, autonomyIRL.chain.eth, metadata)}>Ethereum sign message</button>
        </div>
        <div className="action-container">
          <button onClick={() => signMessage(signMessageText, autonomyIRL.chain.tez, metadata)}>Tezos sign message</button>
        </div>
        <div className="action-container">
          <button onClick={() => callGetPKHProvider()}>Call getPKH Provider</button>
        </div>
        <div className="action-container">
          <button onClick={() => callSignMessageProvider()}>Call signMessage Provider</button>
        </div>
        <div className="action-container">
          <button onClick={() => callSendOperationProvider()}>Call sendOperations Provider</button>
        </div>
        <div className="action-container">
          <button onClick={() => closeWebview()}>Close Webview</button>
        </div>
      </header>
    </div>
  );
}

export default App;
