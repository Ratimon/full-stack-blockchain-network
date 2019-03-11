import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvaluefilter'
})
export class FilterAddressPipe implements PipeTransform {

  constructor(
  ) {}

  transform(items: any[], searchText: string): any[] {


    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return this.isToAddress(it, searchText);
    });
   }

   private isToAddress(it, searchText) :boolean {


    if(Object.keys(it.outputMap).includes(searchText)
      || (it.input.address.toLowerCase() == searchText) ) {
        return true;
    }else {
      return false;
    }

   }

}
