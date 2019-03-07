const Wallet = require('../wallet/index');
const {blockchain} = require('../backend/index');
let {wallet} = require('../backend/index');



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
    console.log(req.body);
     const {privateKey} = req.body;
     wallet.recover({ chain: blockchain.chain, privateKey});

    //  console.log(wallet.keyPair);
    //  console.log(wallet.publicKey);
    res.json({
      address: wallet.publicKey,
      balance: wallet.balance
    });
  }

  exports.postCreateWallet = (req, res) => {

    wallet = new Wallet()
    //  console.log(wallet.keyPair);
    //  console.log(wallet.publicKey);
    res.json({
      address: wallet.publicKey,
      balance: wallet.balance
    });
  }