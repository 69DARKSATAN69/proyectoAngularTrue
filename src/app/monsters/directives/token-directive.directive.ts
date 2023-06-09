import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTokenDirective]'
})
//esta directiva muestra u oculta el elemento en función del valor de la variable 'isLoggedIn' del componente.
//dicha variable es verdadera o falsa en función de la existencia de un token en session storage.
export class TokenDirectiveDirective {


  constructor(private element:ElementRef) {

   }

  @Input() set appTokenDirective(isLoggedIn:boolean){
    //es bastante autoexplicativo.
  this.element.nativeElement.style.display = isLoggedIn ? 'inline-block' : 'none';

}

}
