import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'magic'
})
export class MagicPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
