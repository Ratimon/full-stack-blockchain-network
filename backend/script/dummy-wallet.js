const {ec, cryptoHash} = require('../util/index');
const Wallet = require('../wallet/index')

const dummy_wallet = new Wallet()
const dummy_keyPair = dummy_wallet.keyPair


const dummy_privateKey = dummy_keyPair.getPrivate('hex');

console.log(dummy_privateKey);
console.log(ec.keyFromPrivate(dummy_privateKey))
console.log(ec.keyFromPrivate(dummy_privateKey))

console.log(ec.keyFromPrivate(dummy_privateKey).getPublic().encode('hex'))
console.log(dummy_keyPair)
console.log(dummy_keyPair.getPublic().encode('hex'))


const data ='test';

console.log(dummy_keyPair.sign(cryptoHash(data)));
console.log(ec.keyFromPrivate(dummy_privateKey).sign(cryptoHash(data)))



///////////////////

// const faucetWallet = new Wallet()

// faucetWallet.recover({
//     chain: blockchain.chain,
//     privateKey: 'b958a4f805d8a325266ba33940dc9dfee184a165bcaa0277d2f871e8cfdd2bce'
// })

// console.log(faucetWallet)
// // const faucetTransactionPool = new TransactionPool();
// // const faucettransactionValidator =  new TransactionValidator({ blockchain, transactionPool, faucetWallet, pubsub});