import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../interface/pokemon.interface';

@Pipe({
  name: 'filterList',
})
export class FilterListPipe implements PipeTransform {
  transform(value: Pokemon[], ...args: any): any {
    const resultPokemons = [];
    for (const pokemon of value) {
      if (pokemon.name.toLocaleLowerCase().indexOf(args) > -1) {
        resultPokemons.push(pokemon)
      }
    }
    return resultPokemons;
  }
}
