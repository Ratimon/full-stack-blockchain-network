const Wallet = require('../wallet/index');
const {blockchain} = require('../network/index');
let {wallet} = require('../network/index');

exports.getWallet = (req, res) => {
    const address = wallet.publicKey;
    const privateKey = wallet.keyPair.getPrivate('hex');
    const balance = Wallet.calculateBalance({ chain: blockchain.chain, address });
  
    res.json({
      address,
      privateKey,
      balance
    });
  }

exports.postRecoverWallet = (req, res) => {
     const {privateKey} = req.body;
     wallet.recover({ chain: blockchain.chain, privateKey});

    res.json({
      address: wallet.publicKey,
      balance: wallet.balance
    });
  }

  exports.postCreateWallet = (req, res) => {
    wallet = new Wallet()

    res.json({
      address: wallet.publicKey,
      balance: wallet.balance
    });
  }

  exports.getAccounts = (req, res) => {
    const addressMap = {};

    for (let block of blockchain.chain) {
      for (let transaction of block.data) {
        const recipients = Object.keys(transaction.outputMap);
  
        recipients.forEach(recipient => addressMap[recipient] = Wallet.calculateBalance({ chain: blockchain.chain, address:recipient })) ;

      }
    }
  
    res.json(addressMap);

  }