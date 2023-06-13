/* 
  **************************************************************
	AlignmentDirective.
	Directiva que recoge el valor de "alignment" y según si es "good" o "evil", pone el texto del elemento de color verde o rojo respectivamente.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAlignment]'
})
export class AlignmentDirective {

  constructor(private element:ElementRef) { }

  @Input()
  set appAlignment(alignment:string){
	const alignmentColor = alignment === "good" ? "green" : "red";

	this.element.nativeElement.style.color = alignmentColor;
  }

}
