import { SpellsInterface } from '../interfaces/spellsInterfaces';

export class SpellsDTO implements SpellsInterface {
  id: number = 0;
  name: string = '';
  type: string = '';
  game: string = '';
  image: string = '';
  required: string = '';
  effect: string = '';
  MP: number = 0;
  level: number = 0;
  power: number = 0;
  resume: string = '';
  use: string = '';
}
