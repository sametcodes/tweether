# Tweether ― Social Texting Platform

## About

`tweether` is a blockchain-based twitter clone, _that was done for educational purposes._

The stack is based on React/TypeScript. The smart contract for the application must be located under `src/contract/Tweether.sol`. The ABI code will be produced as `src/contract/Tweether.json` after running `npm run compile:contract` command. The contract address must be defined with `REACT_APP_CONTRACT_ADDRESS` environment variable in the `.env` file.

Using TypeScript on frontend applications provides a safer development environment, it can be optional for some projects. When web applications that drive smart contracts are concerned, it must be a necessity, in my opinion. Interfaces were clearly declared for all the components, and TypeChain was used to declare the smart contract methods. If something changes in the smart contract, it should be compiled again and run `npm run typechain` command to update method interfaces.

## About the contract code

If you check out `src/contract/Tweether.sol`, you'll notice that `tweets[]` array is defined as private variable. The reason is to promote data fetching from the `getTweet` method. The cause is `likedBy` value in the `Tweet` struct requires a calculation; it's not possible to do that in the way of direct access to `tweets[]` variable.

`Tweet` struct has a one-to-many relation on itself. The relation can be seen [here](https://dbdiagram.io/d/633841a37b3d2034ff009027) as a table.
## Install and Run

```bash
npm install
```

```bash
npm start
```

In the case of changing `src/contract/Tweether.sol` file, the ABI code and interface of the smart contract must be reproduced. The `compile:contract` and `compile:typechain` commands can be sent as `compile` at once.

```bash
npm run compile
```

## Dependencies

- [React Blockies](https://www.npmjs.com/package/react-blockies)
- [dethcrypto/TypeChain](https://github.com/dethcrypto/TypeChain)
- [React Router v6](https://reactrouter.com/en/main)