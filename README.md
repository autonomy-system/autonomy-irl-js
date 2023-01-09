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
// get an address by blockchain
// blockchain = "Tezos" => get tez address
// blockchain = "Ethereum" => get eth address
function getAddress(blockChain) {
  autonomyIRL.getAddress(blockChain).then((value) => {
    console.log(value);
  });
}
```

## Demo

[Project example](example)

[![Watch the video](example/DEMO.mp4)](example/DEMO.mp4)

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
