const Transaction = require('./transaction')
const {STARTING_BALANCE} = require('./config');
const {ec, cryptoHash} = require('../util/index');

class Wallet {
    constructor(){
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data));
    }

    recover( {chain, privateKey} ) {

        this.keyPair = ec.keyFromPrivate(privateKey);

        this.publicKey = this.keyPair.getPublic().encode('hex');
        
        this.balance = Wallet.calculateBalance({ chain, address: this.publicKey  })

    }

    createTransaction({recipient, amount, chain}) {

        if(chain) {
            this.balance = Wallet.calculateBalance({
                chain,
                address: this.publicKey
            });
        }

        if(amount> this.balance) {
            throw new Error('Amount exceeds balance')
        }

        return new Transaction({senderWallet: this, recipient, amount});
    }

    static calculateBalance({ chain, address }) {
        let hasConductedTransaction = false;
        let outputsTotal = 0;

        // for (let i=1; i<chain.length; i++) {
        for (let i=chain.length-1; i>-1; i--) {
            const block = chain[i];

            for (let transaction of block.data) {

                if (transaction.input.address === address) {
                    hasConductedTransaction = true;
                }

                const addressOutput = transaction.outputMap[address];

                if (addressOutput) {
                    outputsTotal = outputsTotal + addressOutput;
                }
            }

            if (hasConductedTransaction) {
                break;
            }
        }
        // return STARTING_BALANCE + outputsTotal;
        return hasConductedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;

  }

};

module.exports = Wallet;