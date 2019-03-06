const {ec, cryptoHash} = require('../util/index');
const Wallet = require('../wallet/index')

const dummy_wallet = new Wallet()
const dummy_keyPair = dummy_wallet.keyPair


const dummy_privateKey = dummy_keyPair.getPrivate('hex');

console.log(dummy_privateKey);
console.log(ec.keyFromPrivate(dummy_privateKey))
console.log(ec.keyFromPrivate(dummy_privateKey).getPublic().encode('hex'))
console.log(dummy_keyPair)
console.log(dummy_keyPair.getPublic().encode('hex'))


const data ='test';

console.log(dummy_keyPair.sign(cryptoHash(data)));
console.log(ec.keyFromPrivate(dummy_privateKey).sign(cryptoHash(data)))