const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const Wallet = require('./wallet/index')

const {blockchain, wallet, transactionPool} = require('./backend');

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

const explorerRoutes = require('./routes/explorer')
const validatorRoutes = require('./routes/validator');
const walletRoutes = require('./routes/wallet')

const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, DELETE, OPTIONS"
//   );
//   next();
// });

app.use(explorerRoutes);
app.use(validatorRoutes);
app.use(walletRoutes);

const syncWithRootState = ()=> {
    request({ url:`${ROOT_NODE_ADDRESS}/explorer/blocks`}, (error, response, body)=>{
        if(!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);

            console.log('replace chain on a sync with', rootChain);
            blockchain.replaceChain(rootChain);
        }
    });

    request({ url:`${ROOT_NODE_ADDRESS}/explorer/transaction-pool-map`}, (error, response, body)=>{
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

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;

app.use(express.static(path.join(__dirname, 'dist/blockchain')));
app.use('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/blockchain/index.html'))
});

io.on('connection', socket => {
    console.log('a user connected');

    setInterval(()=>{

        let balance = Wallet.calculateBalance({ chain: blockchain.chain, address : wallet.publicKey });
        // console.log("balance",balance)
        socket.emit('data', { balance, transactionPoolMap: transactionPool });     
    },2000)

    // socket.emit('data', { balance: wallet.balance, transactionPool: transactionPool });
    socket.on('clientData', data => console.log(data));
    socket.on('disconnect', () => console.log('Client disconnected'));
});


// app.listen(PORT,()=>{
//     console.log(`listening at localhost:${PORT}`)

//     if(PORT !== DEFAULT_PORT ) {
//         syncWithRootState();
//     }
// });

server.listen(PORT,()=>{
    console.log(`listening at localhost:${PORT}`)

    if(PORT !== DEFAULT_PORT ) {
        syncWithRootState();
    }
});

// module.exports.PORT = PORT;