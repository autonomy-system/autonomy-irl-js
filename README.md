# Autonomy IRL

## Introduction

The IRL (In the Real Life) library is designed to facilitate seamless interaction between the Autonomy app and websites that support its JavaScript functions. This document outlines the usage and functionality of the IRL library, allowing websites to connect with the Autonomy app's webview and access crucial information and services.

## Download the Autonomy app

### iOS

https://apps.apple.com/us/app/feral-file/id1544022728

### Android

https://play.google.com/store/apps/details?id=com.bitmark.autonomy_client

## Library

### Install

```bash
npm install github:autonomy-system/autonomy-irl-js
```

### Run Tests

```bash
npm test
```

### Usage

#### Construct a URL to scan

```
https://autonomy.io/apps/irl/{{ url_encoded(your_url }}
```

**Example:**
To let the Autonomy app open this URL: `https://example.com?query=1`

```
https://autonomy.io/apps/irl/https%3A%2F%2Fexample.com%3Fquery%3D1
```

### Functions

#### 1. getAddress(chainID, dAppMetadata)

Description: Retrieves the address associated with the Autonomy wallet.

Parameters:

- `chainID`: The chain ID to request the address, it could be on Ethereum or Tezos blockchain.
- `dAppMetadata`: The metadata of the website to present on the Autonomy.

Usage:
Calling this function from a website connected to the Autonomy app allows the website to retrieve the user's wallet address.

Example:

```JS
function getAddress() {
  try {
    const autonomyIRL = new AutonomyIRL();
    const metadata = {
      name: "Feral File",
      url: "https://feralfile.com",
      icons: ["https://feralfile.com/assets/FeralFile.png"],
      description: "Feral File",
    };
    const value = await autonomyIRL.getAddress(autonomyIRL.chain.eth, metadata, {});
    console.log(value.result);
  } catch (error) {
    console.log(error);
  }
}
```

#### 2. signMessage(message, address, chainID, dAppMetadata)

Description: Requests the Autonomy app to sign a provided message using the selected wallet.

Parameters:

- `message`: The message to be signed.
- `chainID`: The chain ID to request the address, it could be on Ethereum or Tezos blockchain.
- `dAppMetadata`: The metadata of the website to present on the Autonomy.

Usage:
Invoking this function from a website enables the app to sign a specific message (personal_sign) with the user's selected wallet.

Example:

```JS
async function signMessage() {
  try {
    const autonomyIRL = new AutonomyIRL();
    const metadata = {
      name: "Feral File",
      url: "https://feralfile.com",
      icons: ["https://feralfile.com/assets/FeralFile.png"],
      description: "Feral File",
    };
    const value = await autonomyIRL.getAddress(autonomyIRL.chain.eth, metadata, {});
    if (!value.result) {
      const message = "Hello world!";
      const signHash = await autonomyIRL.signMessage(toHex(message), value.result, autonomyIRL.chain.eth, metadata);
      console.log("Sign Hash: ", signHash.result);
    }
  } catch (error) {
    console.log(error);
  }
}
```

#### 3. sendTransaction(chainID, address, tx_payload, dAppMetadata)

Description: Requests the user's confirmation to sign and broadcast a transaction to the blockchain.

Parameters:

- `tx_payload`: The transaction payload containing all necessary information.
- `chainID`: The chain ID to request the address, it could be on Ethereum or Tezos blockchain.
- `dAppMetadata`: The metadata of the website to present on the Autonomy.

Usage:
Utilizing this function from a website prompts the Autonomy app to present the transaction details to the user, allowing them to review and authorize the transaction.

Example:

```JS
async function sendTransaction(destAddress, value, data) {
  try {
    const autonomyIRL = new AutonomyIRL();
    const metadata = {
      name: "Feral File",
      url: "https://feralfile.com",
      icons: ["https://feralfile.com/assets/FeralFile.png"],
      description: "Feral File",
    };
    const value = await autonomyIRL.getAddress(autonomyIRL.chain.eth, metadata, {});
    if (!value.result) {
      const sourceAddress = value.result;
      const tx = {
        from: sourceAddress,
        to: destAddress,
        gas: "0xb00a",
        value: value,
        data: data,
      };
      const result = await autonomyIRL.sendTransaction(
        autonomyIRL.chain.eth,
        sourceAddress,
        [tx],
        metadata
      );
      console.log("Transaction ID: ", result.result)
    }
  } catch (error) {
    console.log(error);
  }
}
```

```JS
function closeWebview() {
  autonomyIRL.closeWebview();
}
```

#### 4. AUWalletProvider

```JS
async function callProvider() {
  try {
    const tezos = new TezosToolkit("https://api.tez.ie/rpc/carthagenet");

    const auWalletProvider = new AUWalletProvider({
      name: "Feral File",
      description:
        "Feral File - Exhibiting, Curating, and Collecting Digital Media",
      url: "#",
      icons: ["https://feralfile.com/assets/FeralFile.png"],
    });

    tezos.setWalletProvider(auWalletProvider);

    await tezos.wallet.pkh();

    const ops = [];

    ops.push({
      kind: OpKind.TRANSACTION,
      to: "KT1Sy7X6TubmZ39G8CHVrUcxjc3jiF68P8oB",
      amount: 1,
      mutez: true,
      parameter: {
        entrypoint: "mint",
        value: {
          prim: "Pair",
          args: [
            {
              int: "34",
            },
            {
              prim: "Pair",
              args: [
                {
                  prim: "None",
                },
                {
                  prim: "None",
                },
              ],
            },
          ],
        },
      },
      storageLimit: 650,
    });

    const transaction = await tezos.wallet.batch().with(ops).send();
    console.log(transaction.opHash);
  } catch (error) {
    console.log(error);
  }
}
```

### Demo

[Project example](example)

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
