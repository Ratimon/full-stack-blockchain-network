import { Pipe, PipeTransform } from '@angular/core';

import {FilterAddressPipe} from './filter-address.pipe'

@Pipe({
  name: 'keyvaluefilterslice'
})
export class FilterAddressSlicePipe implements PipeTransform {

  constructor(
    private filterAddressPipe: FilterAddressPipe
  ) {}

  transform(items: any, searchText: string, start: number, end?: number): any {

    let values =  this.filterAddressPipe.transform(items, searchText);


    if (values == null) return values;

    // if (!this.supports(values)) {
    //   throw invalidPipeArgumentError(SlicePipe, values);
    // }

    return values.slice(start, end);
  }

//   private supports(obj: any): boolean { return typeof obj === 'string' || Array.isArray(obj); }


}