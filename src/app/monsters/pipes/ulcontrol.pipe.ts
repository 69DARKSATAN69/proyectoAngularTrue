import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ulcontrol'
})
//esta pipe recibe el atributo 'drops' de la clase DTO de monstruos y devuelve un mensaje indicativo junto con los drops en cuestión
//si existiesen, o un mensaje indicativo a secas si no.
export class UlcontrolPipe implements PipeTransform {

  transform(monsterDrops:string[]): string[] | string {
    return monsterDrops.length > 0 ? `It also may result in one or several of the following items: ${this.handleDrops(monsterDrops)}` : 'This monster drops no items whatsoever.'
  }

  //esta función hace los mensajes por cada drop.
handleDrops(monsterDrops:string[]){
return monsterDrops.map(drop => ` a ${drop}`)
}



}
