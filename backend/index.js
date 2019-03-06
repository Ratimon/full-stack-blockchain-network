const Blockchain = require('../model/blockchain')
const PubSub = require('./pubsub');
const TransactionPool = require('../wallet/transaction-pool');
const Wallet = require('../wallet/index')
const TransactionValidator = require('../validator/transaction-validator');

const transactionPool = new TransactionPool();
const blockchain = new Blockchain();
const wallet = new Wallet();


var pubsub = new PubSub({ blockchain, transactionPool});
const transactionValidator = new TransactionValidator({ blockchain, transactionPool, wallet, pubsub});

// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// let sockets = new Set();


module.exports = {blockchain, pubsub, transactionPool, wallet, transactionValidator};