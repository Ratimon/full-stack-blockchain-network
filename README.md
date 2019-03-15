# Full Stack Blockchain Test Network

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5 (was 6.0.8)

I create Proof of Stake blockchain test network and its frontend for educational purpose, so that I can better understand the blockchain technology.

This work is inspired by
1) https://lhartikk.github.io/ 
2) https://github.com/15Dkatz/cryptochain

## Technology
- NodeJs
- Socket.io
- Redis
- Angular


## Start

Run `npm install` to install all dependency packages


## Build static file

Run `npm run dev-front` to build the static file. The build artifacts will be stored in the `dist/` directory.

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

Run `npm run dev-peer` for a dev server. Navigate to the localhost with the port specified in the terminal. The app will automatically reload if you change any of the source files. It also syncs the chain via the redis channel

## Use the Wallet

 Navigate to `http://localhost:3000/wallet` or other peer port specified in the terminal

 Note that Every wallet holder can validate transaction(s) and earn the reward

 ## Request the money

 Navigate to `http://localhost:3000/faucet` to request the testing money.

 ## Explorers

 Navigate to `http://localhost:3000/explorer/blocks` to explore validated blocks

 Navigate to `http://localhost:3000/explorer/transactions` to explore confirmed transactions

 Navigate to `http://localhost:3000/explorer/accounts` to explore accounts' addresses and balances
 

 ### TODO

- [ ] Implement new Reward logic that directly substract from sender 's transaction amount
- [ ] Implement Partial Amount Staking Logic
- [ ] Implement Light and Full node logic
- [ ] Implement Merkle Tree data structure to store transactions insteadof simple array
- [ ] Imprement Compressed public key as address
- [ ] Prevent User from validate the empty transaction pool object
- [ ] Limit one request per address per hour + captcha in faucet app
- [ ] Upload the Blockchain to the File System
- [ ] Load the Blockchain from the File System:
- [x] Real-tine Transaction Pool Socket Updates
- [ ] Refactor with Ngrx to solve overdone API fetch on smaller component
- [X] Upgrade to Angular 7 and use Scrolling Module(from Angular Material)
- [ ] Fresh Keys Per Transaction: create a new private key on every new transaction
- [ ] Implement a cluster of redis urls as the connections increase
- [ ] Refactor Backend with Go Programming
- [ ] Deployment using Docker

## Post request to validate block
```
curl -H "Content-type:application/json" --data '{"data" : "Some data to the first block"}' http://localhost:3000/validate
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
