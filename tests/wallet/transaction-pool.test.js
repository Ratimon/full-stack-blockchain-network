const Transaction = require('../../wallet/transaction');
const TransactionPool = require('../../wallet/transaction-pool');
const Wallet = require('../../wallet/index');

describe('TransactionPool', ()=>{
    let transactionPool, transaction, senderWallet;

    beforeEach(()=>{
        transactionPool = new TransactionPool();
        senderWallet = new Wallet;
        transaction = new Transaction({
            senderWallet,
            recipient: 'fake-recipient',
            amount: 50
        });
    });

    describe('setTransaction()', ()=>{
        it('should add a transaction',()=>{
            transactionPool.setTransaction(transaction);

            expect(transactionPool.transactionMap[transaction.id])
                .toBe(transaction);
        });
    });

    describe('existingTransaction', ()=>{
        it('should returns an existing transaction given an input address ', ()=>{
            transactionPool.setTransaction(transaction);

            expect(
                transactionPool.existingTransaction({ inputAddress: senderWallet.publicKey})
            ).toBe(transaction);
        });
    });
});