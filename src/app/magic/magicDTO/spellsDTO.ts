import { SpellsInterface } from '../interfaces/spellsInterfaces';

export class SpellsDTO implements SpellsInterface {
  name: string = '';
  type: string = '';
  game: string = '';
  image: string = '';
  required: string = '';
  effect: string = '';
  MP: number = 0;
  power: number = 0;
  resume: string = '';
  use: string = '';
}
