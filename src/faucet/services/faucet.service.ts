import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class FaucetService {

  constructor(
    private http: HttpClient,
  ) { }

  requestValue(payload: string): Observable<string> {
    const recipient = {recipient: payload}
    return this.http
      .post<string>(`/faucet/request`, recipient)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }


}
