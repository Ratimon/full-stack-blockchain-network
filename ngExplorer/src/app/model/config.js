const INITIAL_DIFFICULTY = 1;

/*
const GENESIS_DATA = {
    index: 0,
    hash: 'hash-one',
    previousHash: '-----',
    timestamp: Date.parse("Wed, 27 July 2016 13:30:00"),
    data: [],
    difficulty: INITIAL_DIFFICULTY,
    minterBalance: 10000,
    minterAddress: '',
};
*/

const GENESIS_DATA = {index: 0,
    hash: 'hash-one',
    previousHash: '-----',
    timestamp: Date.parse('2016-07-27T05:30:00.000Z'),
    data: [],
    difficulty: 1,
    minterBalance: 10000,
    minterAddress: ''
};


module.exports = {GENESIS_DATA};