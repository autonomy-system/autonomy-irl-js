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

<video src='https://user-images.githubusercontent.com/24427942/211269856-e93628d6-e52e-4ad6-a8ce-3f79a72747ed.mp4'/>

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
