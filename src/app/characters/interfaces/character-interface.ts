/* 
  **************************************************************
	Character Interface.
	Define la interfaz que luego se implementará en CharacterDTO.
	Aquí no incluí el id porque no es dato que introduzcamos, si no dato que se crea automáticamente en el json-server.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

export interface CharacterInterface {
	name:string
	image:string
	alignment:string
	height:number
	game:string
	weapon:string
	recap:string
	info:string
}
