import { Directive, ElementRef, HostListener } from '@angular/core';

import { Subscription } from 'rxjs';
import { TranslateService } from '../services/translate.service';

@Directive({
  selector: '[appTranslate]',
})
export class TranslateDirective {
  private translateSubscription: Subscription;
  originalText: string = '';
  setTimeOutId: any;
  constructor(
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {
    this.translateSubscription = new Subscription();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.originalText = this.elementRef.nativeElement.innerText;
    // solo traduzco el nombre en inglés
    const [keyword] = this.originalText.split('/');
    // para prevenir multiples llamadas al pasar el mouse por encima
    this.setTimeOutId = setTimeout(() => {
      this.translateSubscription = this.translateService
        .translate(keyword)
        .subscribe((result) => {
          const translated = result.translatedText;
          this.elementRef.nativeElement.innerText = translated;
        });
    }, 300);
    return this.translateSubscription;
  }

  @HostListener('mouseleave') onMouseLeave() {
    // previene que el cambio perpetúe si hay demora en la llamada
    clearTimeout(this.setTimeOutId);
    this.translateSubscription.unsubscribe();
    this.elementRef.nativeElement.innerText = this.originalText;
  }
}
