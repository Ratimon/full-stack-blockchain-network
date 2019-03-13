import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterblock'
})
export class FilterBlockPipe  implements PipeTransform {

  constructor(
  ) {}

  transform(items: any[], searchText: string): any[] {

    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( it => {
      return this.doesContainAddress(it, searchText);
    });
   }


   private doesContainAddress(block, searchText) :boolean {


    let transactions = block.data;
    let outputMaps = transactions.map(transaction=>transaction.outputMap);
    let inputs  = transactions.map(transaction=>transaction.input.address);

    for(let i = 0; i < outputMaps.length; i++) {

      if(Object.keys(outputMaps[i]).includes(searchText)) {
        return true;
      }

    }

    for(let j = 0; j < inputs.length; j++) {

      if(inputs[j].toLowerCase() == searchText) {
        return true;
      }

    }

    return false;

   }

}