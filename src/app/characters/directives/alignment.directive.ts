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
