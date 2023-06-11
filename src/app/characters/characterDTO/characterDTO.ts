import { CharacterInterface } from "../interfaces/character-interface";

export class CharacterDTO implements CharacterInterface{
	id:number | null = null;
	name: string;
	image: string;
	alignment: string;
	height: number;
	game: string;
	weapon: string;
	recap: string;
	info: string;

	constructor(name?:string, image?:string, alignment?:string, height?:number, game?:string, weapon?:string, recap?:string, info?:string){
		this.name = name ?? '';
		this.image = image ?? '';
		this.alignment = alignment ?? '';
		this.height = height ?? 0;
		this.game = game ?? '';
		this.weapon = weapon ?? '';
		this.recap = recap ?? '';
		this.info = info ?? '';
	}
}
