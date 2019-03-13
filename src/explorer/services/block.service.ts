import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {throwError as observableThrowError,  Observable } from 'rxjs';

import { Block } from '../models/block.model'

@Injectable()
export class BlockService {

  constructor(
    private http: HttpClient
  ) { }

  getBlocks(): Observable<Block[]> {
    return this.http
      .get<Block[]>(`/explorer/api/blocks`)
      .pipe(catchError((error: any) => observableThrowError(error.json())));
  }

}
