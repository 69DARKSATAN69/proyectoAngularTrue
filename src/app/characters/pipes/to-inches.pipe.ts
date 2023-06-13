/* 
  **************************************************************
	toInches pipe.
	Pipe que recibe por parámetro un número, que sería la altura del personaje en centímetros.
	Con eso hace el cálculo para pasarlo a pulgadas y además le da formato añadiendo ambas unidades.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toInches'
})
export class ToInchesPipe implements PipeTransform {

  transform(cms: number, ...args: unknown[]): string {
	
	let final = cms+" cms / "+(cms/2.54).toFixed(2)+" inches";
    
	return final;
  }

}
