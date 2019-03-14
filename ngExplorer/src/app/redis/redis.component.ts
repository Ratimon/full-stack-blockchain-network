import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { PubsubService } from '../pubsub.service';

import Redis = require('redis');
import Block = require('../model/block');
import Blockchain = require('../model/blockchain');
import { BLOCKCHAIN, GENESISCHAIN } from '../mock-blockchain';


const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

const options: Redis.ClientOpts = {
  host: 'localhost',
  port: 6379
};

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.css']
})

export class RedisComponent implements OnInit {

  blockchain: Blockchain;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.log(null, 'Redis component initializing...');

    this.blockchain.chain = BLOCKCHAIN;

    const subscriber: Redis.RedisClient = Redis.createClient(options);

    /*
    subscriber.on(
      'error',
      (channel: string, count: number) => this.log(null, `Redis: Subscribed to channel: ${channel}. count: ${count}`)
    );
    */

    const err: Error = new Error();
    const resCallback: (err: Error | null, res: any) => void = this.log;
    const okCallback: (err: Error | null, res: 'OK') => void = this.log;

    subscriber.get('test', resCallback);
    subscriber.set('test', 'test', okCallback);

    if (subscriber.connected === true) {
      subscriber.subscribe('BLOCKCHAIN');
    } else {
      err.stack = 'Redis';
      err.name = 'connnection';
      err.message = 'not ready...';
      this.log(err, null);
    }

    subscriber.on(
      'subscribe',
      (channel: string, count: number) => this.log(null, `Redis: Subscribed to channel: ${channel}. count: ${count}`)
    );

    subscriber.set('BLOCKCHAIN', JSON.stringify(GENESISCHAIN), this.log);

    subscriber.on(
      'message',
      (channel: string, message: string) => this.dispatcher(channel, message)
    );

    this.log(null, 'Redis component is initialized...');
  }

  private log(error: Error, reply: any) {
    if (error) {
      this.messageService.add('Redis error: ' + error.stack + ' | ' + error.name + ' | ' + error.message);
    }
    if (reply) {
      this.messageService.add('Redis reply: ' + reply);
    }
  }

  getBlockchain(): Block[] {
    this.log(null, 'pubsub channel sent blockchain...');
    return (this.blockchain.chain);
  }

  dispatcher(channel: string, message: string) {
    this.log(null, `Message received. Channel: ${channel}. Message ${message}`)

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {});
        this.log(null, `pubsub received blockchain: ${parsedMessage}`);
        break;
      case CHANNELS.TRANSACTION:
        break;
      default:
        return;
    }
  }
}


