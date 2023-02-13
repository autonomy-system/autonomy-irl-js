## Install

```bash
npm install autonomy-irl-js
```

## Run Tests

```bash
npm test
```

## Use

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
          from: "address",
          to: "address",
          gasLimit: "<optional>",
          maxFeePerGas: "<optional>",
          maxPriorityFeePerGas: "<optional>",
          nonce: "0",
          value: "value",
          data: "<optional>",
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
      chain: autonomyIRL.chain.eth,
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
