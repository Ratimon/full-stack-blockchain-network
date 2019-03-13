import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';

import {Account} from '../models/account.model'

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<Account> {
    return this.http
      .get<Account>(`/explorer/api/accounts`)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

}
