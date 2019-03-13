import { Pipe, PipeTransform } from '@angular/core';

import {FilterBlockPipe} from './filter-block.pipe';

@Pipe({
  name: 'filterblockslice'
})
export class FilterBlockSlicePipe implements PipeTransform {

  constructor(
    private filterBlockPipe: FilterBlockPipe
  ) {}

  transform(items: any, searchText: string, start: number, end?: number): any {

    let values =  this.filterBlockPipe.transform(items, searchText);

    if (values == null) return values;

    return values.slice(start, end);
  }

}