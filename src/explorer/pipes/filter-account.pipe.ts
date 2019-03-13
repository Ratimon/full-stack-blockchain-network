import { Pipe, PipeTransform} from '@angular/core';
import {KeyValuePipe} from '@angular/common'


@Pipe({
  name: 'filteraccount'
})
export class FilterAccountPipe implements PipeTransform {

  constructor(
    private keyvaluePipe :KeyValuePipe
  ) {}

  transform(items: any, searchText: string): any {

    items = this.keyvaluePipe.transform(items);

    if(!items) return {};
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return it.key == searchText;
    });
   }

}