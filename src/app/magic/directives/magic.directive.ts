import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { GiphyService } from '../services/giphy.service';

@Directive({
  selector: '[appMagic]',
})
export class MagicDirective {
  constructor(
    private elementRef: ElementRef,
    private giphyService: GiphyService
  ) {}

  private originalSrc = '';
  @HostListener('mouseenter')
  onMouseEnter() {
    this.originalSrc = this.elementRef.nativeElement.src;
    this.giphyService
      .searchGiphy('final fantasy game trailer')
      .subscribe((data) => {
        const maxRandomIndex = data.length;
        const randomIndex = Math.floor(Math.random() * maxRandomIndex);
        const srcGif = data[randomIndex].images.downsized_large.url;
        this.setSrcImage(srcGif);
      });
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setSrcImage(this.originalSrc);
  }

  private setSrcImage(url: string) {
    this.elementRef.nativeElement.src = url;
  }
}
