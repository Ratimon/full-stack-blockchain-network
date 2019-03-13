const Blockchain = require('../model/blockchain');
const Wallet = require('../wallet/index');

const blockchain = new Blockchain();
const validatorWallet = new Wallet();

blockchain.addBlock({
  data: 'initial',
  balance: validatorWallet.balance,
  address: validatorWallet.publicKey
});

console.log('first block', blockchain.chain[blockchain.chain.length-1]);

let previousTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i=0; i<10000; i++) {
  previousTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;

  blockchain.addBlock({
    data: `block ${i}`,
    balance: validatorWallet.balance,
    address: validatorWallet.publicKey
  });
  nextBlock = blockchain.chain[blockchain.chain.length-1];

  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - previousTimestamp;
  times.push(timeDiff);

  average = times.reduce((total, num) => (total + num))/times.length;

  console.log('first block', blockchain.chain[blockchain.chain.length-1]);
  console.log(`Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`);
}