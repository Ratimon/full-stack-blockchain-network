const Blockchain = require('../model/blockchain')
const PubSub = require('./pubsub');
const TransactionPool = require('../wallet/transaction-pool');
const Wallet = require('../wallet/index')
const TransactionMiner = require('../miner/transaction-miner');

const transactionPool = new TransactionPool();
const blockchain = new Blockchain();
const wallet = new Wallet();

var pubsub = new PubSub({ blockchain, transactionPool});
const transactionMiner = new TransactionMiner({ blockchain, transactionPool, wallet, pubsub});

const faucetWallet = new Wallet()

faucetWallet.recover({
    chain: blockchain.chain,
    privateKey: 'b958a4f805d8a325266ba33940dc9dfee184a165bcaa0277d2f871e8cfdd2bce'
})

module.exports = {blockchain, pubsub, transactionPool, wallet, transactionMiner, faucetWallet};