const Blockchain = require('./blockchain');


// create a unique, global symbol name
// -----------------------------------

const BLOCKCHAIN_KEY = Symbol.for("My.App.Namespace.blockchain");

// check if the global object has this symbol
// add it if it does not have the symbol, yet
// ------------------------------------------

var globalSymbols = Object.getOwnPropertySymbols(global);
var hasBlockchain = (globalSymbols.indexOf(BLOCKCHAIN_KEY) > -1);

if (!hasBlockchain){
  global[BLOCKCHAIN_KEY] = {
    foo: "bar"
  };
}

// define the singleton API
// ------------------------

var blockchain = new Blockchain;

Object.defineProperty(blockchain, "instance", {
  get: function(){
    return global[BLOCKCHAIN_KEY];
  }
});

// ensure the API is never changed
// -------------------------------

// Object.freeze(blockchain);

// export the singleton API only
// -----------------------------

module.exports = blockchain;