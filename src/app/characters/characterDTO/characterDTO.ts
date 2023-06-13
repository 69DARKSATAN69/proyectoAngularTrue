/* 
  **************************************************************
	Clase CharacterDTO.
	Clase base de este módulo. En ella se define toda la información básica que van a tener los objetos de esta clase.
	Es todo información relevante que se mostrará en las diferentes páginas.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

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
