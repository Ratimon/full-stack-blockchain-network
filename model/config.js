const INITIAL_DIFFICULTY = 1;

const GENESIS_DATA = {
    index: 0,
    hash: 'hash-one',
    previousHash: '-----',
    timestamp: new Date("Wed, 27 July 2016 13:30:00"),
    data: [
        {
            "id": "COINBASE-TRANSACTION",
            "outputMap": {
                "049d8f88d66b9f746bfbc42ddbee2b78096c37be9070716bf26e1bea8f501b2c6adb22a8a05f0bcc934db114cf26ad61ee50d70ad9551713014e618690e4d4adae": 9999999
            },
            "input": {
                "timestamp": 0,
                "amount": 9999999,
                "address": "COINBASE-TRANSACTION",
                "signature": {
                    "r": "f4f3d967f3b10d05d54735bcaf830e63910c06ea8a93f79f20b2a0f20fc656a0",
                    "s": "730fa2830f284cf1978b9f19970ce87fbabe28a4807f0a5e51616c497c3a46d4",
                    "recoveryParam": 1
                }
            }
        }
    ],
    difficulty: INITIAL_DIFFICULTY,
    minterBalance: 10000,
    minterAddress: '',
};


module.exports = {GENESIS_DATA};