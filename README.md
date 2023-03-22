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

```JS
import autonomyIRL from "autonomy-irl-js";
// get an address by chain
// chain = autonomyIRL.chain.tez => get tez address
// chain = autonomyIRL.chain.eth => get eth address

function getAddress({ chain, params }) {
  autonomyIRL
    .getAddress({
      chain: chain,
      params: params,
      metadata: {
        name: "app_name",
        description: "app_description",
        url: "#",
        icons: ["url_icon"],
      },
    })
    .then((value) => {
      if (value.errorMessage != null) {
        console.log(value.errorMessage);
      } else {
        console.log(value.result);
      }
    });
}
```

```JS
function closeWebview() {
  autonomyIRL.closeWebview();
}
```

```JS
function signMessage() {
  autonomyIRL
    .signMessage({
      payload: "payload",
      sourceAddress: "address",
      chain: autonomyIRL.chain.eth,
      metadata: {
        name: "app_name",
        description: "app_description",
        url: "#",
        icons: ["url_icon"],
      },
    })
    .then((value) => {
      if (value.errorMessage != null) {
        console.log(value.errorMessage);
      } else {
        console.log(value.result);
      }
    });
}
```

```JS
function sendTransaction() {
  autonomyIRL
    .sendTransaction({
      transactions: [
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
      sourceAddress: "address",
      metadata: {
        metadata: {
          name: "app_name",
          description: "app_description",
          url: "#",
          icons: ["url_icon"],
        },
      },
      chain: autonomyIRL.chain.tez,
    })
    .then((value) => {
      if (value.errorMessage != null) {
        console.log(value.errorMessage);
      } else {
        console.log(value.result);
      }
    });
}
```

## Demo

[Project example](example)

<video src='https://user-images.githubusercontent.com/24427942/211269856-e93628d6-e52e-4ad6-a8ce-3f79a72747ed.mp4'/>

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
