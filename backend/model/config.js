const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 10;

const GENESIS_DATA = {
    index: 0,
    hash: 'hash-one',
    previousHash: '-----',
    timestamp: new Date("Wed, 27 July 2016 13:30:00"),
    data: [
        {
            "id": "COINBASE-ID-REWARD",
            "outputMap": {
                "049d8f88d66b9f746bfbc42ddbee2b78096c37be9070716bf26e1bea8f501b2c6adb22a8a05f0bcc934db114cf26ad61ee50d70ad9551713014e618690e4d4adae": 50
            },
            "input": {
                "timestamp": 0,
                "amount": 50,
                "address": "COINBASE-TRANSACTION",
                "signature": {
                    "r": "",
                    "s": "",
                    "recoveryParam": 1
                }
            }
        },
        {
            "id": "COINBASE-ID",
            "outputMap": {
                "049d8f88d66b9f746bfbc42ddbee2b78096c37be9070716bf26e1bea8f501b2c6adb22a8a05f0bcc934db114cf26ad61ee50d70ad9551713014e618690e4d4adae": 999999999999999999999
            },
            "input": {
                "timestamp": 0,
                "amount": 999999999999999999999,
                "address": "COINBASE-TRANSACTION",
                "signature": {
                    "r": "",
                    "s": "",
                    "recoveryParam": 1
                }
            }
        }
    ],
    nonce: 1,
    difficulty: INITIAL_DIFFICULTY
};


module.exports = {GENESIS_DATA, MINE_RATE, INITIAL_DIFFICULTY};