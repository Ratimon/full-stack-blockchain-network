const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

// const Blockchain = require('./model/blockchain');
// const PubSub = require('./network/pubsub')

// const blockchain = new Blockchain();
const blockchain = require('./model/index')

// const pubsub = new PubSub({ blockchain});
const pubsub = require('./network/index')


const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

// setTimeout(()=> pubsub.broadcastChain(), 1000);
const validatorRoutes = require('./routes/validator');

const app = express();
app.use(bodyParser.json());

app.use(validatorRoutes);


const syncChains = ()=> {
    request({ url:`${ROOT_NODE_ADDRESS}/blocks`}, (error, response, body)=>{
        if(!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });
};

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT+Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT,()=>{
    console.log(`listening at localhost:${PORT}`)

    if(PORT !== DEFAULT_PORT ) {
        syncChains();
    }
});

module.exports = app;