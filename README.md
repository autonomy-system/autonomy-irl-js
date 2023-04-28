# Autonomy IRL

## Install

```bash
npm install autonomy-irl-js
```

## Run Tests

```bash
npm test
```

## Usage

### Construct a URL to scan
```
https://autonomy.io/apps/irl/{{ url_encoded(your_url }}
```

**Example:**
To let the Autonomy app open this URL: `https://example.com?query=1`
```
https://autonomy.io/apps/irl/https%3A%2F%2Fexample.com%3Fquery%3D1
```

### Code
**How to use AUWalletProvider:**
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

```JS
function getAddress() {
  const autonomyIRL = new AutonomyIRL();
  autonomyIRL
    .getAddress(autonomyIRL.chain.tez, {
      name: "Feral File",
      description:
        "Feral File - Exhibiting, Curating, and Collecting Digital Media",
      url: "#",
      icons: ["https://feralfile.com/assets/FeralFile.png"],
    })
    .then((value) => {
      if (value.errorMessage != null) {
        alert(value.errorMessage);
      } else {
        alert(value.result);
      }
    });
}
```


```JS
async function signMessage() {
  const autonomyIRL = new AutonomyIRL();
  const address = await autonomyIRL.getAddress(autonomyIRL.chain.tez, {
    name: "Feral File",
    description:
      "Feral File - Exhibiting, Curating, and Collecting Digital Media",
    url: "#",
    icons: ["https://feralfile.com/assets/FeralFile.png"],
  });
  if (address.result != null) {
    autonomyIRL
      .signMessage(
        "05010000004254657a6f73205369676e6564204d6573736167653a206d79646170702e636f6d20323032312d30312d31345431353a31363a30345a2048656c6c6f20776f726c6421",
        address.result,
        autonomyIRL.chain.tez,
        {
          name: "Feral File",
          description:
            "Feral File - Exhibiting, Curating, and Collecting Digital Media",
          url: "#",
          icons: ["https://feralfile.com/assets/FeralFile.png"],
        }
      )
      .then((value) => {
        if (value.errorMessage != null) {
          alert(value.errorMessage);
        } else {
          alert(value.result);
        }
      });
  }
}
```

```JS
async function sendTransaction() {
  const autonomyIRL = new AutonomyIRL();
  const address = await autonomyIRL.getAddress(autonomyIRL.chain.tez, {
    name: "Feral File",
    description:
      "Feral File - Exhibiting, Curating, and Collecting Digital Media",
    url: "#",
    icons: ["https://feralfile.com/assets/FeralFile.png"],
  });
  if (address.result != null) {
    autonomyIRL
      .sendTransaction(
        autonomyIRL.chain.tez,
        address.result,
        [
          {
            kind: "transaction",
            destination: "KT1Sy7X6TubmZ39G8CHVrUcxjc3jiF68P8oB",
            amount: 0,
            mutez: true,
            entrypoint: "mint",
            parameters: {
              prim: "Pair",
              args: [
                {
                  int: "120",
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
            storageLimit: "650",
          },
        ],
        {
          name: "Feral File",
          description:
            "Feral File - Exhibiting, Curating, and Collecting Digital Media",
          url: "#",
          icons: ["https://feralfile.com/assets/FeralFile.png"],
        }
      )
      .then((value) => {
        if (value.errorMessage != null) {
          alert(value.errorMessage);
        } else {
          alert(value.result);
        }
      });
  }
}
```
```JS
function closeWebview() {
  autonomyIRL.closeWebview();
}
```

## Demo

[Project example](example)

<video src='https://user-images.githubusercontent.com/24427942/211269856-e93628d6-e52e-4ad6-a8ce-3f79a72747ed.mp4'/>

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
