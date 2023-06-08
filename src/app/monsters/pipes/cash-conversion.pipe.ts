import { Pipe, PipeTransform } from '@angular/core';

//Esta pipe convierte la cantidad en 'gil', moneda de los Final Fantasy, a su equivalente en Euros.
//Por casualidades de la vida, el valor de 'gil' es exactamente el mismo que el de quetzales guatemaltecos. 
@Pipe({
  name: 'cashConversion'
})
export class CashConversionPipe implements PipeTransform {

//La pipe sólo recibe valores 'gil' o 'eur', además de la cantidad a transformar.
  transform(cantidad:number, coin:string): number {
    return coin === 'gil' ? cantidad*8.44 : cantidad*0.12;
  
  }

}
