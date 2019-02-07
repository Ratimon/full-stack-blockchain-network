const INITIAL_DIFFICULTY = 1;


const GENESIS_DATA = {
    index: 0,
    hash: 'hash-one',
    previousHash: '-----',
    timestamp: new Date("Wed, 27 July 2016 13:30:00"),
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    minterBalance: 10000,
    minterAddress: '',
};


module.exports = {GENESIS_DATA};