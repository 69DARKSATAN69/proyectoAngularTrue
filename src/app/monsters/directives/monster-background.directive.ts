import { Directive, ElementRef, Input } from '@angular/core';
import { MonsterAttributes } from '../interfaces/monster-attributes';

@Directive({
  selector: '[appMonsterBackground]'
})
//esta directiva cambia el color de fondo de las tarjetas de monstruo en función de su tipo de monstruo y el juego del que provienen.
//recibe un objeto con el tipo y el juego del monstruo en cuestión (utilizando la interfaz monter-attributes), asigna valores hexadecimales
//a dos variables por el tipo y por el juego y finalmente asigna el fondo como una gradiente con ambos.

export class MonsterBackgroundDirective {
typeColor:string;
gameColor:string;
  constructor(private element:ElementRef) {
    this.typeColor = '#fabada';
    this.gameColor = '#beeeef';
   }

@Input() set appMonsterBackground(attributes: MonsterAttributes){
  //la interfaz MonsterAttributes tiene atributos juego y tipo, en función de ellos se asignan los colores via switch.
  switch (attributes.game) {
    case 'XV':
      this.gameColor = '#b19cd9'
    break;
    case 'X':
      this.gameColor = '#c4feff';
      break;
    case 'VII':
    default:
      this.gameColor = '#54b484';
      break;
  }
  switch(attributes.type){
    case 'Dragon':
      this.typeColor = '#864b52';
      break;
    case 'Undead':
      this.typeColor = '#64484f';
      break;
    case 'Plant':
      this.typeColor = '#65af63';
      break;
    case 'Beast':
      this.typeColor = '#f94449'
      break;
    case 'Daemon':
      this.typeColor = '#ffcbd1';
      break;
    case 'Worm':
      this.typeColor = '#301934';
      break;
    case 'Ogre':
      this.typeColor = '#1560bd';
      break;
    case 'Elemental':
      this.typeColor = '#59788e';
      break;
    case 'Humanoid':
      default:
      this.typeColor = '#fda172'
      break;

    }
    //después de ambas asignaciones, se establece el fondo como un fondo que cambia de color de izquierda a derecha, primero segun el juego
    //y luego segun el tipo.
this.element.nativeElement.style.background = `linear-gradient(90deg, ${this.gameColor}, ${this.typeColor}`;
}

}
// this.element.nativeElement.style.background = 'radial-gradient(circle, #123FFF, #BEEEF)';
