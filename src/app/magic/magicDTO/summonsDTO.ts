import { SummonInterface } from '../interfaces/summonsInterface';

export class SummonsDTO implements SummonInterface {
  id: number = 0;
  game: string = '';
  name: string = '';
  location: string = '';
  magicMateria: string = '';
  image: string = '';
  element: string = '';
  MP: number = 0;
  level: number = 0;
  Attack: string = '';
  Attributes: string = '';
  effect: string = '';
  resume: string = '';
  infoExtra: string = '';
}
