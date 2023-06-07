import { CharacterInterface } from "../interfaces/character-interface";

export class CharacterDTO implements CharacterInterface{
	name: string = '';
	image: string = '';
	alignment: string = '';
	height: number = 0;
	game: string = '';
	weapon: string = '';
	recap: string = '';
	info: string = '';
}
