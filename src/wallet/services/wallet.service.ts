import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Wallet } from '../models/wallet.model'

@Injectable()
export class WalletService {

  constructor(private http: HttpClient) { }

  getWallet(): Observable<Wallet> {
    return this.http
      .get<Wallet>(`/wallet-info`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  recoverWallet(payload: string): Observable<string> {
    const privateKey = {privateKey: payload}
    return this.http
      .post<string>(`/wallet/recover`, privateKey)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createWallet(): Observable<Wallet>  {
    return this.http
      .post<Wallet>(`/wallet/create`, {})
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  sendValue(payload: Object): Observable<Object> {
    return this.http
      .post<Object>(`/wallet/transact`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  validateTransactions(): Observable<Object> {
    return this.http
      .get<Object>(`wallet/validate-transactions`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

}
