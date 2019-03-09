const Blockchain = require('../../model/blockchain');
const Block = require('../../model/block');
const Transaction = require('../../wallet/transaction')
const cryptoHash = require('../../util/crypto-hash');
const Wallet = require('../../wallet/index');
let {REWARD_INPUT} = require('../../wallet/config')

describe('Blockchain', ()=>{
    ////
    let blockchain, newChain, originalChain, errorMock, validatorWallet;

    beforeEach(()=> {
        blockchain  = new Blockchain();
        newChain = new Blockchain();
        errorMock = jest.fn();
        validatorWallet = new Wallet()

        originalChain = blockchain.chain;
        global.console.error = errorMock;
    });

    it('should contain a `chain` Array instance', ()=> {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('should start with the genesis block', ()=> {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('should add  a new block to the chain', ()=> {
        const newData = 'foo bar';
        blockchain.addBlock({
          data: newData,
          balance: validatorWallet.balance,
          address: validatorWallet.publicKey          
        });

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    });

    // describe('fetchAll()', ()=> {
    //     it('should (return the block chain data(all chains))', )
    // });

    describe('findById(id, chain)', ()=>{

    });

    describe('isValidChain(chain)', ()=>{
        describe('when the chain does not start with the genesis block', () => {
            it('returns false', () => {
              blockchain.chain[0] = { data: 'fake-genesis' };
      
              expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
          });
      
        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(() => {
              blockchain.addBlock({
                data: 'Bears',
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
              blockchain.addBlock({
                data: 'Beets',
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
              blockchain.addBlock({
                data: 'Battlestar Galactica',
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
            });
      
            describe('and a previousHash reference has changed', () => {
              it('returns false', () => {
                blockchain.chain[2].previousHash = 'broken-lastHash';
      
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
              });
            });
      
            describe('and the chain contains a block with an invalid field', () => {
              it('returns false', () => {
                blockchain.chain[2].data = 'some-tempered-data';
      
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
              });
            });
      
        //     describe('and the chain contains a block with a jumped difficulty', () => {
        //       it('returns false', () => {
        //         const previousBlock = blockchain.chain[blockchain.chain.length-1];
        //         const previousHash = previousBlock.hash;
        //         const timestamp = Date.now();
        //         const nonce = 0;
        //         const data = [];
        //         const difficulty = previousBlock.difficulty - 3;
        //         const hash = cryptoHash(timestamp, previousHash, difficulty, nonce, data);

        //         const badBlock = new Block({
        //           timestamp, previousHash, hash, nonce, difficulty, data
        //         });
      
        //         blockchain.chain.push(badBlock);
      
        //         expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        //       });
        //     });
      
            describe('and the chain does not contain any invalid blocks', () => {
              it('returns true', () => {
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
              });
            });

        });
    });

    describe('replaceChain(newchain)', ()=> {
        let logMock;

        beforeEach(()=> {
            logMock= jest.fn();

            global.console.log = logMock;
        });

        describe('when the new chain is not longer', ()=> {

            beforeEach(()=> {
                newChain.chain[0] = {new: 'chain'};

                blockchain.replaceChain(newChain.chain);
            });

            it('does not replace the chain',()=> {
                expect(blockchain.chain).toEqual(originalChain);
            });

            it('logs an error', ()=> {
                expect(errorMock).toHaveBeenCalled();
            });
        });

        describe('when the new chain is  longer', ()=> {
            beforeEach(()=> {
                newChain.addBlock({
                  data: 'Beers',
                  balance: validatorWallet.balance,
                  address: validatorWallet.publicKey
                });
                newChain.addBlock({
                  data: 'Beets',
                  balance: validatorWallet.balance,
                  address: validatorWallet.publicKey
                });
                newChain.addBlock({
                  data: 'Battlestar Glactica',
                  balance: validatorWallet.balance,
                  address: validatorWallet.publicKey
                });
            });

            describe('and the chain is invalid', ()=> {
                beforeEach(()=> {
                    newChain.chain[2].hash = 'some-fake-hash';

                    blockchain.replaceChain(newChain.chain);;
                });
                
                it('does not replace the chain',()=> {
                    expect(blockchain.chain).toEqual(originalChain)
                });

                it('logs an error', ()=> {
                    expect(errorMock).toHaveBeenCalled();
                });
            });

            describe('and the chain is valid', ()=> {
                beforeEach(()=> {
                    blockchain.replaceChain(newChain.chain);
                });

                it('replaces the chain',()=> {
                    expect(blockchain.chain).toEqual(newChain.chain)
                });

                it('logs about the chain replacement', ()=> {
                    expect(logMock).toHaveBeenCalled();
                });
            });           
        });

        describe('and the `validateTransactions` flag is true', () => {
            it('calls validTransactionData()', () => {
              const validTransactionDataMock = jest.fn();
      
              blockchain.validTransactionData = validTransactionDataMock;
      
              newChain.addBlock({
                data: 'foo',
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
              blockchain.replaceChain(newChain.chain, true);
      
              expect(validTransactionDataMock).toHaveBeenCalled();
            });
          });

    });

    describe('getDifficulty(chain)', () => {

        beforeEach(()=> {
            newChain.addBlock({
              data: 'Beers',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: 'Beets',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '3',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '4',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '5',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: '6',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
        })

        it('raises, or lower the difficulty for a quickly validated chain', () => {
        const possibleResults = [Blockchain.getDifficulty(originalChain), Blockchain.getDifficulty(originalChain)+1]
          expect(possibleResults.includes(Blockchain.getDifficulty(newChain.chain))).toBe(true);
        //   expect(Block.getDifficulty(newChain)).toEqual(block.difficulty+1);
        });
    
    
        // it('has a lower limit of 1', () => {
    
        //   expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
        // });
    });

    describe('getCumulativeDifficulty(chain)', ()=> {
        beforeEach(()=> {
            newChain.addBlock({
              data: 'Beers',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: 'Beets',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
            newChain.addBlock({
              data: 'Battlestar Glactica',
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
        });

        it('should return total difficulty of 2^3',()=>{
            expect(Blockchain.getCumulativeDifficulty(newChain.chain)).toEqual(8);
        });
    });

    describe('validTransactionData()', () => {
        let transaction, rewardTransaction, wallet;
    
        beforeEach(() => {
          wallet = new Wallet();
          transaction = wallet.createTransaction({ recipient: 'foo-address', amount: 65 });
          rewardTransaction = Transaction.rewardTransaction({ validatorWallet: wallet });
        });
    
        describe('and the transaction data is valid', () => {
          it('returns true', () => {
            newChain.addBlock({
              data: [transaction, rewardTransaction],
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
    
            expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(true);
            expect(errorMock).not.toHaveBeenCalled();
          });
        });
    
        describe('and the transaction data has multiple rewards', () => {
          it('returns false and logs an error', () => {
            newChain.addBlock({
              data: [transaction, rewardTransaction, rewardTransaction],
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
    
            expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false);
            expect(errorMock).toHaveBeenCalled();
          });
        });
    
        describe('and the transaction data has at least one malformed outputMap', () => {
          describe('and the transaction is not a reward transaction', () => {
            it('returns false and logs an error', () => {
              transaction.outputMap[wallet.publicKey] = 999999;
    
              newChain.addBlock({
                data: [transaction, rewardTransaction],
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
    
              expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false);
              expect(errorMock).toHaveBeenCalled();
            });
          });
    
          describe('and the transaction is a reward transaction', () => {
            it('returns false and logs an error', () => {
              rewardTransaction.outputMap[wallet.publicKey] = 999999;
    
              newChain.addBlock({
                data: [transaction, rewardTransaction],
                balance: validatorWallet.balance,
                address: validatorWallet.publicKey
              });
    
              expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false);
              expect(errorMock).toHaveBeenCalled();
            });
          });
        });
    
        describe('and the transaction data has at least one malformed input', () => {
          it('returns false and logs an error', () => {
            wallet.balance = 9000;
    
            const evilOutputMap = {
              [wallet.publicKey]: 8900,
              fooRecipient: 100
            };
    
            const evilTransaction = {
              input: {
                timestamp: Date.now(),
                amount: wallet.balance,
                address: wallet.publicKey,
                signature: wallet.sign(evilOutputMap)
              },
              outputMap: evilOutputMap
            }
    
            newChain.addBlock({
              data: [evilTransaction, rewardTransaction],
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
    
            expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false);
            expect(errorMock).toHaveBeenCalled();
          });
        });
    
        describe('and a block contains multiple identical transactions', () => {
          it('returns false and logs an error', () => {
            newChain.addBlock({
              data: [transaction, transaction, transaction, rewardTransaction],
              balance: validatorWallet.balance,
              address: validatorWallet.publicKey
            });
    
            expect(blockchain.validTransactionData({ chain: newChain.chain })).toBe(false);
            expect(errorMock).toHaveBeenCalled();
          });
        });

      });


})