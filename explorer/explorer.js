const redis = require('redis');
const blockchain = require('../model/index');
const {pubsub} = require('../network/index');

const CHANNELS= {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
}

class ExplorerPubSub {
    constructor({ blockchain, transactionPool }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;

        this.publisher = redis.createClient();
        this.subscriber = redis.createClient();

        this.subscribeToChannels();

        this.subscriber.on(
            'message',
            (channel, message)=>this.handleMessage(channel, message)
        );
    }
    
    handleMessage(channel, message){
        console.log(`Explorer: Message received. Channel:${channel}. Message: ${message}`);

        const parsedMessage = JSON.parse(message);

        switch(channel) {
            case CHANNELS.BLOCKCHAIN:
                this.blockchain.replaceChain(parsedMessage);
                break;
            case CHANNELS.TRANSACTION:
                this.transactionPool.setTransaction(parsedMessage);
                break;
            default:
                return;
        }
    }

    subscribeToChannels() {
        Object.values(CHANNELS).forEach(channel => {
            this.subscriber.subscribe(channel);
        });
    }
}

function getBlockchain () => {
    // TODO: File System implemenatation
    // Blockchain.fetchAll(blocks => {
    //     res.json(blocks);
    // });
    res.json(blockchain.chain);
};

function getBlock = (req, res, next) => {
    const {blockId} = req.params;
    res.json(blockchain.chain[blockId]);
};

currentBlockchain = pubsub.blockchain;
currentTransactionPool = pubsub.transactionPool;
