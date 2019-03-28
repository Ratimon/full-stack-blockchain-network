
import {throwError as observableThrowError,  Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError} from 'rxjs/operators';

import { Wallet } from '../models/wallet.model'

@Injectable()
export class WalletService {

  currentAddress: string 

  constructor(
    private http: HttpClient,
  ) { }

  logout() {
    localStorage.clear();
  }

  getWallet(): Observable<Wallet> {
    return this.http
      .get<Wallet>(`/wallet-info`)
      .pipe(
        catchError((error: any) => observableThrowError(error.json())));
  }

  useWallet() : Observable<|string> {
    return this.http
      .get<string>(`/wallet-info`)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  recoverWallet(payload: string): Observable< string> {
    const privateKey = {privateKey: payload}
    return this.http
      .post<string>(`/wallet/recover`, privateKey)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  createWallet(): Observable<Wallet>  {
    return this.http
      .post<Wallet>(`/wallet/create`, {})
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  sendValue(payload: Object): Observable<Object> {
    return this.http
      .post<Object>(`/wallet/transact`, payload)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  mineTransactions(): Observable<Object> {
    return this.http
      .get<Object>(`wallet/mine-transactions`)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  startMiningTransactions(): Observable<Object> {
    return this.http
      .get<Object>(`wallet/start-mining-transactions`)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

  stopMining() : Observable<Object> {
    return this.http
    .get<Object>(`wallet/stop-mining`)
    .pipe(catchError((error: any) => observableThrowError(error.json())));
  }


}
