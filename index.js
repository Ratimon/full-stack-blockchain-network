const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const Wallet = require('./wallet/index')
// const blockchain = require('./model/index');
const {blockchain, transactionPool, wallet} = require('./network/index');

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

const validatorRoutes = require('./routes/validator');
const transactRoutes = require('./routes/transact');

const app = express();
app.use(bodyParser.json());

app.use(validatorRoutes);
app.use(transactRoutes);

app.get('/wallet-info', (req, res) => {
    const address = wallet.publicKey;
  
    res.json({
      address,
      balance: Wallet.calculateBalance({ chain: blockchain.chain, address })
    });
  });

const syncWithRootState = ()=> {
    request({ url:`${ROOT_NODE_ADDRESS}/blocks`}, (error, response, body)=>{
        if(!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });

    request({ url:`${ROOT_NODE_ADDRESS}/transaction-pool-map`}, (error, response, body)=>{
        if(!error && response.statusCode === 200) {
            const rootTransactionPoolMap = JSON.parse(body);

            console.log('replace transaction pool map on a sync with', rootTransactionPoolMap);
            transactionPool.setMap(rootTransactionPoolMap);
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
        syncWithRootState();
    }
});

module.exports = app;