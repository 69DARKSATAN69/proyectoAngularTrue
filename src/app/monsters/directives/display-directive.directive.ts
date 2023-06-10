import { Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appDisplayDirective]'
})
export class DisplayDirectiveDirective {
//Esta directiva cambia la imagen mostrada al lado de la lista publica de monstruos en función del juego seleccionado

  constructor(private element:ElementRef) {

   }
   //recibe la variable selectedGame del componente, que es donde se guarda el string de juego seleccionado (xv, x o vii)
   //acto seguido establece la imagen de fondo en función del juego seleccionado. El default es el vii, que es el default del select.
 @Input() set appDisplayDirective(selectedGame:string){
  switch (selectedGame) {
    case 'XV':
      this.element.nativeElement.style.backgroundImage = 'url(https://ffxv.crimsonkeep.com/blog/wp-content/uploads/2019/03/Ansel-00025450b.jpg)';
      break;
    case 'X':
      this.element.nativeElement.style.backgroundImage = 'url(https://i.pinimg.com/originals/de/8c/ee/de8ceef4191e6f513d5aeb0b033413e6.jpg)';
      break;
    case 'VII':
    default:
      this.element.nativeElement.style.backgroundImage = 'url(https://jegged.com/img/Games/Final-Fantasy-VII/Walkthrough/FFVII-01414-Inside-Planet-Jenova-Synthesis.png)';
      break;
  }
 }


}