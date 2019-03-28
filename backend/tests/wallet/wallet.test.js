const Wallet = require('../../wallet/index')
const Transaction = require('../../wallet/transaction')
const {verifySignature} = require('../../util/index');
const Blockchain = require('../../model/blockchain');
let {STARTING_BALANCE} = require('../../wallet/config');
STARTING_BALANCE = 1000

describe('Wallet',()=>{
    let wallet;

    beforeEach(()=>{
        wallet = new Wallet;
    });

    it(' should has a `public key` property', ()=>{
        expect(wallet).toHaveProperty('balance');
    });

    it(' should has a `balance` property', ()=>{
        expect(wallet).toHaveProperty('publicKey');
    });

    describe('sign()',()=>{
        const data ='test';

        it('verifies a signature', ()=>{
            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: wallet.sign(data)
                })
            ).toBe(true);
        });

        it('does not verify an invalid signature',()=>{
            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature: new Wallet().sign(data)
                })
            ).toBe(false);
        });

    });

    describe('createTransaction()',()=>{
        describe('and the amount exceeds the balance',()=>{
            it('throws an error',()=>{
                expect(()=>wallet.createTransaction({ amount: 999999, recipient: 'foo-recipient'}))
                    .toThrow('Amount exceeds balance');
            });
        });

        describe('and the amount is valid', ()=>{
            let transaction, amount, recipient;

            beforeEach(()=>{
                amount = 50;
                recipient = 'foo-recipient';
                transaction = wallet.createTransaction({ amount, recipient});
            });

            it('creates an instance of `Transaction`', ()=>{
                expect(transaction instanceof Transaction).toBe(true);
            });

            it('matches the transaction input with the wallet',()=>{
                expect(transaction.input.address).toEqual(wallet.publicKey);
            });

            it('outputs the amount the recipient',()=>{
                expect(transaction.outputMap[recipient]).toEqual(amount);
            });
        });

        describe('and the chain is passed', ()=>{
            it('should call `Wallet.calculateBalance`',()=>{
                const calculateBalanceMock = jest.fn();

                const originalCalculatedBalance = Wallet.calculateBalance

                Wallet.calculateBalance = calculateBalanceMock;

                wallet.createTransaction({
                    recipient: 'foo',
                    amount: 10,
                    chain: new Blockchain().chain
                });

                expect(calculateBalanceMock).toHaveBeenCalled();

                 Wallet.calculateBalance = originalCalculatedBalance;

            });
        });
    });

    describe('calculateBalance()', () => {
        let blockchain;
    
        beforeEach(() => {
          blockchain = new Blockchain();
          // wallet = new Wallet()
        });
    
        describe('and there are no outputs for the wallet', () => {
          it('returns the `STARTING_BALANCE`', () => {
            expect(
              Wallet.calculateBalance({
                chain: blockchain.chain,
                address: wallet.publicKey
              })
            ).toEqual(STARTING_BALANCE);
          });
        });
    
        describe('and there are outputs for the wallet', () => {
          let transactionOne, transactionTwo, minerWallet;
    
          beforeEach(() => {

            minerWallet = new Wallet()


            transactionOne = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 50
            });
    
            transactionTwo = new Wallet().createTransaction({
              recipient: wallet.publicKey,
              amount: 60
            });
            ////
            blockchain.addBlock({
              data: [transactionOne, transactionTwo],
            });

          });
    
          it(' should add the sum of all outputs to the wallet balance', () => {
            expect(
              Wallet.calculateBalance({
                chain: blockchain.chain,
                address: wallet.publicKey
              })
            ).toEqual(
              STARTING_BALANCE +
              transactionOne.outputMap[wallet.publicKey] +
              transactionTwo.outputMap[wallet.publicKey]
            );
          });



    
          describe('and the wallet has made a transaction', () => {
            let recentTransaction;
    
            beforeEach(() => {
              recentTransaction = wallet.createTransaction({
                recipient: 'foo-address',
                amount: 30
              });
              ////
              blockchain.addBlock({
                data: [recentTransaction],
              });
            });
    
            it('returns the output amount of the recent transaction', () => {
              expect(
                Wallet.calculateBalance({
                  chain: blockchain.chain,
                  address: wallet.publicKey
                })
              ).toEqual(recentTransaction.outputMap[wallet.publicKey]);
            });
    
            describe('and there are outputs next to and after the recent transaction', () => {
              let sameBlockTransaction, nextBlockTransaction;
    
              beforeEach(() => {
                recentTransaction = wallet.createTransaction({
                  recipient: 'later-foo-address',
                  amount: 60
                });
    
                sameBlockTransaction = Transaction.rewardTransaction({ minerWallet: wallet });
                
                ////
                blockchain.addBlock({
                  data: [recentTransaction, sameBlockTransaction],
                });
    
                nextBlockTransaction = new Wallet().createTransaction({
                  recipient: wallet.publicKey,
                  amount: 75
                });
                
                ////
                blockchain.addBlock({
                  data: [nextBlockTransaction],
                });
              });
    
              it('includes the output amounts in the returned balance', () => {
                expect(
                  Wallet.calculateBalance({
                    chain: blockchain.chain,
                    address: wallet.publicKey
                  })
                ).toEqual(
                  recentTransaction.outputMap[wallet.publicKey] +
                  sameBlockTransaction.outputMap[wallet.publicKey] +
                  nextBlockTransaction.outputMap[wallet.publicKey]
                );
              });

            });
          });
        });
    });

    describe('recover()',()=> {
      let blockchain, existingWallet, existingPrivateKey
    
      beforeEach(() => {
        blockchain = new Blockchain();
        existingWallet = new Wallet();

        transactionOne = new Wallet().createTransaction({
          recipient: existingWallet.publicKey,
          amount: 50
        });

        transactionTwo = new Wallet().createTransaction({
          recipient: existingWallet.publicKey,
          amount: 60
        });

        blockchain.addBlock({
          data: [transactionOne, transactionTwo],
        });

      });

      it('should recover the existing  wallet by using the private key ',()=>{
        existingAddress = existingWallet.address;
        existingbalance = Wallet.calculateBalance({
          chain: blockchain.chain,
          address: existingWallet.publicKey
        });       
        existingPrivateKey = existingWallet.keyPair.getPrivate('hex');


        existingWallet = new Wallet();

        existingWallet.recover({
          chain: blockchain.chain ,
          privateKey: existingPrivateKey
        });

        expect(existingAddress).toEqual(existingWallet.address);
        expect(existingbalance).toEqual(existingWallet.balance);
      })



    })

});