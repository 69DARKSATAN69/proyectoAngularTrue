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

	//He puesto el constructor porque necesito usar el id para distntas tareas por lo que el objeto tiene que tenerlo declarado. 
	//Pero el id lo genera el jsonserver, así que tuve que poner que pudiese ser null para no meterlo al crear un personaje.
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
