const hexToBinary = require('hex-to-binary');
const Block = require('../../model/block');
const {GENESIS_DATA , MINE_RATE } = require('../../model/config');
const {cryptoHash} = require('../../util/index');


describe('block', ()=>{
    const index = 0;
    const hash = 'foo-hash';
    const previousHash = 'bar-hash';
    const timestamp = 2000 ;
    // const timestamp = new Date("Wed, 27 July 2016 13:30:00") ;
    const data = ['blockchain', 'data'];
    const nonce = 1;
    const difficulty = 1;

    const block = new Block({index, hash, previousHash, timestamp, data, difficulty, nonce});
    
    it('should has an index, hash, previousHash, timestamp, data and difficulty ', ()=>{
        expect(block.index).toEqual(index);
        expect(block.hash).toEqual(hash);
        expect(block.previousHash).toEqual(previousHash);
        expect(block.timestamp).toEqual(timestamp);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);    

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

    describe ('mineBlock( {previousBlock, data})', ()=>{

        let minedBlock, previousBlock, data, difficulty

        beforeAll(()=> {
            previousBlock = Block.genesis();
            data = 'validated data';
            difficulty = previousBlock.difficulty
            minedBlock = Block.mineBlock({ previousBlock, data });
        });


        it('should return a block instance',()=>{
            expect(minedBlock instanceof Block).toEqual(true);
        });

        it('should sets an `index`',()=>{
            let index = previousBlock.index
            index++;
            expect(minedBlock.index).toEqual(index);
        });

        it('should generate a SHA-256 `hash with proper parameters', ()=>{
            expect(minedBlock.hash).toEqual(
                cryptoHash(
                    minedBlock.index,
                    minedBlock.timestamp,
                    previousBlock.hash,
                    data,
                    minedBlock.nonce,
                    minedBlock.difficulty,
                )
            )
        })

        it('should set the `previousHash` to equal to `hash` of previousBlock ', ()=>{
            expect(minedBlock.previousHash).toEqual(previousBlock.hash);
        })

        it('should set a `timestamp`', ()=> {
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('should set the data', ()=> {
            expect(minedBlock.data).toEqual(data);
        });

        it('sets a `hash` that matches the difficulty criteria', () => {
            expect(hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty))
              .toEqual('0'.repeat(minedBlock.difficulty));
        });
      
        it('adjusts the difficulty', () => {
        const possibleResults = [previousBlock.difficulty+1, previousBlock.difficulty-1];
    
        expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);
        });

    });

    describe('adjustDifficulty()', () => {
        it('raises the difficulty for a quickly mined block', () => {
          expect(Block.adjustDifficulty({
            originalBlock: block, timestamp: block.timestamp + MINE_RATE - 100
          })).toEqual(block.difficulty+1);
        });
    
        it('lowers the difficulty for a slowly mined block', () => {
          expect(Block.adjustDifficulty({
            originalBlock: block, timestamp: block.timestamp + MINE_RATE + 100
          })).toEqual(block.difficulty-1);
        });
    
        it('has a lower limit of 1', () => {
          block.difficulty = -1;
    
          expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
        });
      });


});