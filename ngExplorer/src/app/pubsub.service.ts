import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import Block = require('./model/block');
import Blockchain = require('./model/blockchain');
import { BLOCKCHAIN, GENESISCHAIN } from './mock-blockchain';
import { RedisComponent } from './redis/redis.component';
import { strictEqual } from 'assert';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PubsubService {

  redis: RedisComponent;

  private nodeAddrPort = 'http://localhost:3000';
  private getBlockchainApi = '/explorer/blocks';
  private getBlockApi = '/explorer/blocks/:blockId';
  private getBlockchainUrl = this.nodeAddrPort + this.getBlockchainApi;
  private getBlockUrl = this.nodeAddrPort + this.getBlockApi;

  constructor(private messageService: MessageService, private http: HttpClient) {}

  getBlockchain(): Observable<Block[]> {
    const searchUrl = this.getBlockchainUrl;
    // const searchUrl = 'http://localhost:3000/explorer/blocks';
    return this.http.get<Block[]>(searchUrl, httpOptions)
      .pipe(
        tap(_ => this.log('fetched blockchain')),
        catchError(this.handleError('getBlockchain', []))
      );
  }

  getBlock(id: number): Observable<Block> {
    const searchUrl = this.getBlockUrl.replace(':blockId', id.toString());
    return this.http.get<Block>(searchUrl)
      .pipe(
        tap(_ => this.log(`fetched block index=${id}`)),
        catchError(this.handleError<any>(`getBlock index=${id}`, []))
      );
  }
/*
  getBlockchain(): Block[] {
    if (this.redis) {
      return (this.redis.getBlockchain());
    } else {
      return( BLOCKCHAIN );
    }
  }
*/
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      this.log(`error : ` + error); // log to website instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed : ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
      this.messageService.add('pubsub : ' + message);
  }

}
