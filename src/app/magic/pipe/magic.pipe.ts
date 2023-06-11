import { Pipe, PipeTransform } from '@angular/core';
import { SpellsDTO } from '../magicDTO/spellsDTO';
import { SummonsDTO } from '../magicDTO/summonsDTO';

@Pipe({
  name: 'calculateDamage',
})
export class MagicPipe implements PipeTransform {
  transform(value: SpellsDTO | SummonsDTO): unknown {
    return (20 / 16) * ((value.level + value.MP) * 6);
  }
}
