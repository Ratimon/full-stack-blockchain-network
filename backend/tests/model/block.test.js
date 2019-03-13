const Block = require('../../model/block');
const {GENESIS_DATA} = require('../../model/config');
const {cryptoHash} = require('../../util/index');


describe('block', ()=>{
    const index = 0;
    const hash = 'foo-hash';
    const previousHash = 'bar-hash';
    const timestamp = new Date("Wed, 27 July 2016 13:30:00") ;
    const data = ['blockchain', 'data'];
    const difficulty = 1;
    const minterBalance = 10000;
    const minterAddress = '';


    const block = new Block({index, hash, previousHash,timestamp, data, difficulty, minterAddress,  minterBalance  });
    
    it('should has an index, hash, previousHash, timestamp, data and difficulty ', ()=>{
        expect(block.index).toEqual(index);
        expect(block.hash).toEqual(hash);
        expect(block.previousHash).toEqual(previousHash);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.data).toEqual(data);
        expect(block.difficulty).toEqual(difficulty);    
        expect(block.minterBalance).toEqual(minterBalance); 
        expect(block.minterAddress).toEqual(minterAddress);
    });

    describe('genesis()', ()=>{
        const genesisBlock = Block.genesis();

        it('should return a block instance', ()=>{
            expect(genesisBlock instanceof Block).toEqual(true);
        });

        it('should return the genesis data', ()=> {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });

    });

    describe ('validateBlock( {previousBlock, data, hash})', ()=>{

        let validatedBlock, previousBlock, data, difficulty

        beforeAll(()=> {
            previousBlock = Block.genesis();
            data = 'validated data';
            difficulty = previousBlock.difficulty
            validatedBlock = Block.validateBlock({previousBlock, data, difficulty, minterBalance, minterAddress});
        });


        it('should return a block instance',()=>{
            expect(validatedBlock instanceof Block).toEqual(true);
        });

        it('should sets an `index`',()=>{
            let index = previousBlock.index
            index++;
            expect(validatedBlock.index).toEqual(index);
        });

        it('should generate a SHA-256 `hash with proper parameters', ()=>{
            expect(validatedBlock.hash).toEqual(
                cryptoHash(
                    validatedBlock.index,
                    previousBlock.hash,
                    validatedBlock.timestamp,
                    data,
                    validatedBlock.difficulty,
                    validatedBlock.minterBalance,
                    validatedBlock.minterAddress
                )
            )
        })

        it('should set the `previousHash` to equal to `hash` of previousBlock ', ()=>{
            expect(validatedBlock.previousHash).toEqual(previousBlock.hash);
        })

        it('should set a `timestamp`', ()=> {
            expect(validatedBlock.timestamp).not.toEqual(undefined);
        });

        it('should set the data', ()=> {
            expect(validatedBlock.data).toEqual(data);
        });

        // // TODO
        // it('sets the difficulty', ()=> {
        //     expect(validatedBlock.difficulty).toEqual(difficulty);
        // });

        // // TODO
        // it('sets the minterBalance', ()=> {
        //     expect(validatedBlock.minterBalance).toEqual(minterBalance);
        // });

        // // TODO
        // it('sets the minterAddress', ()=> {
        //     expect(validatedBlock.minterAddress).toEqual(minterAddress);
        // });

        it('sets a `hash` that matches the PoS puzzle', () => {
            expect(Block.isStakingBlockValid(
                validatedBlock.previousHash,
                validatedBlock.minterAddress,
                validatedBlock.timestamp,
                validatedBlock.minterBalance,
                validatedBlock.difficulty,
                validatedBlock.index)).toEqual(true);

        });

    });

     // // TODO : test Pos puzzle
    // describe('isStakingBlockValid(previousHash, minterAddress, timestamp, balance, difficulty, index)', ()=>{
    //     const isValid = Block.isStakingBlockValid(previousHash, minterAddress, timestamp, balance, difficulty, index)
    //     it('',)
    //     // expect(validatedBlock.data).toEqual(data);
    // })


    describe('isValidNewBlock(previousBlock, newBlock)', ()=>{
        const previousBlock = Block.genesis();
        let newBlock, config

        beforeEach(()=> {
            config = {
                index : 1,
                hash : cryptoHash(
                    1,
                    'hash-one',
                    new Date("Wed, 27 July 2016 13:30:00"),
                    [],
                    1,
                    10000,
                    ''
                ),
                previousHash:'hash-one',
                timestamp: Date.now(),
                data: 'tampered data',
                difficulty: 1,
                minterBalance: 10000,
                minterAddress: ''
            };
        });

 
        it('should return false when index for previous block plus one is not equal to index for current one', ()=>{
            config.index = -4;
            newBlock = new Block(config);

            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            // const previousIndex = previousBlock.index;
            // const currentIndex = newBlock.index;

            // expect(previousIndex).toEqual(0);
            // expect(currentIndex).toEqual(-4);
            expect(isValid).toEqual(false);
        });

        it('should return false when previous block `s hash does not match with new block `previous hash', ()=>{
            config.previousHash = 'tampered hash';
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            expect(isValid).toEqual(false);
        });

        it('should return false when current block `s hash is not valid, or contains invalid input', ()=>{

            config.hash = 'tampered hash';
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            expect(isValid).toEqual(false);
        });

        it('should return false when value of minterBalance is less than zero', ()=>{

            config.minterBalance = -2;
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            expect(isValid).toEqual(false);
        });

        //TODO
        it('should return false when value of difficult value is less than zero', ()=>{

            // config.difficulty = -2;
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            // expect(isValid).toEqual(false);
        });

        //TODO
        it('should return false when timestamp is invalid', ()=>{

            // config.timestamp = new Date();
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            // expect(isValid).toEqual(false);
        });

        //TODO
        it('should return false when minterAddress is invalid', ()=>{

            // config.minterAddress = 'tampered address';
            newBlock = new Block(config);
            const isValid = Block.isValidNewBlock({previousBlock, newBlock});
            // expect(isValid).toEqual(false);
        });

    });

    // TODO
    describe('isValidBlockStructure(block)',()=> {
        const previousBlock = Block.genesis();

        it('shoud return true if all types of data are correct',()=>{

            const isValid = Block.isValidBlockStructure(previousBlock);

            expect(typeof previousBlock.index).toEqual('number');
            expect(typeof previousBlock.hash).toEqual('string');
            expect(typeof previousBlock.previousHash).toEqual('string');
            // expect(typeof previousBlock.timestamp).toEqual('object');
            // expect(typeof previousBlock.data).toEqual('object');
            expect(typeof previousBlock.difficulty).toEqual('number');
            expect(typeof previousBlock.minterBalance).toEqual('number');
            expect(typeof previousBlock.minterAddress).toEqual('string');

            expect(isValid).toEqual(true);

        })
    })


});