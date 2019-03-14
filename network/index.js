const PubSub = require('./pubsub');
const TransactionPool = require('../wallet/transaction-pool');

const transactionPool = new TransactionPool()
const blockchain = require('../model/index')

// create a unique, global symbol name
// -----------------------------------

const PUBSUB_KEY = Symbol.for("My.App.Namespace.pubsub");

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasPubsub = (globalSymbols.indexOf(PUBSUB_KEY) > -1);

if (!hasPubsub){
  global[PUBSUB_KEY] = {
    foo: "bar"
  };
}

// define the singleton API
// ------------------------

var pubsub = new PubSub({ blockchain, transactionPool});

Object.defineProperty(pubsub, "instance", {
  get: function(){
    return global[PUBSUB_KEY];
  }
});

// ensure the API is never changed
// -------------------------------

// Object.freeze(pubsub);

// export the singleton API only
// -----------------------------

module.exports = {pubsub, transactionPool};
// module.exports = pubsub;