import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GiphyService } from '../services/giphy.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appMagic]',
})
export class MagicDirective {
  private gifSubscription: Subscription;

  //suscripción a API de Giphy
  constructor(
    private elementRef: ElementRef,
    private giphyService: GiphyService
  ) {
    this.gifSubscription = new Subscription();
  }

  private originalSrc = '';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.originalSrc = this.elementRef.nativeElement.src;
    this.gifSubscription = this.giphyService
      .searchGiphy('final fantasy game trailer')
      .subscribe((data) => {
        // evita obtener un índice que no exista en el arrary de gifs
        const maxRandomIndex = data.length;
        const randomIndex = Math.floor(Math.random() * maxRandomIndex);
        const srcGif = data[randomIndex].images.downsized_large.url;
        this.setSrcImage(srcGif);
      });
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setSrcImage(this.originalSrc);
    // previene que el cambio de imagen si la petición demora demasiado o pasamos el mouse muy rápido
    this.gifSubscription.unsubscribe();
  }

  private setSrcImage(url: string) {
    this.elementRef.nativeElement.src = url;
  }
}
