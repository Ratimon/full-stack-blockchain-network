import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtertransaction'
})
export class FilterTransactionPipe implements PipeTransform {

  constructor(
  ) {}

  transform(items: any[], searchText: string): any[] {

    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return this.isToAddress(it, searchText) || this.isFromAddress(it, searchText);
    });
   }

   private isToAddress(it, searchText) :boolean {

    if(Object.keys(it.outputMap).includes(searchText)) {
        return true;
    } else {
      return false;
    }
   }

   private isFromAddress(it, searchText) :boolean {

    if((it.input.address.toLowerCase() == searchText)) {
        return true;
    } else {
      return false;
    }
   }

}