import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Transaction } from '../models/transaction.model'

@Injectable()
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`/explorer/transactions`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
