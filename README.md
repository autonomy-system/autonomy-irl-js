# Hello World for NPM

This is a test package to help learn about creating and
publishing NPM packages.

The package provides a function 'sayHello' which, by default,
prints "Hello World" to the console.

## Install

```bash
npm install @treborg/hello-world-npm
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

## License

This code is 100% free and open-source, under the [MIT license](LICENSE).
