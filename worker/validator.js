/*
    Validator Worker started as separate processes. It subscribes 
    to the redis pub/sub channel for blockchain. Awaiting for new
    block and blockchain for validation 
*/

const Model = require('../model/index');
const blockchain = Model.blockchain;
const Network = require('../network/index');
const pubsub = Network.pubsub;
const validator = require('../controllers/validator');
const block = require('../model/block');
const Express = require('express');
const router = Express.Router();

//TODO: Blockchain validation and block addition

//TOD: Voting for longest chain and consensus
