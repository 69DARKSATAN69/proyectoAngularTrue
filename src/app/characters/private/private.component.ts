/* 
  **************************************************************
	Private component.
	Es el componente padre, en su HTML se muestra el formulario y la lista/tabla de personajes.
	
	Se encarga de obtener todos los personajes almacenados mediante el servicio y de pasárselos 
	al hijo.
	
	Recibe el personaje a editar desde la tabla hija y se lo envía al formulario.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/


import { Component } from '@angular/core';
import { CharacterServiceService } from '../services/character-service.service';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent {
	public characterArray$:Observable<CharacterDTO[]>;
	public characters:CharacterDTO[];
	public editableCharacter:CharacterDTO;

	constructor(private service:CharacterServiceService){
		this.characterArray$ = new Observable<CharacterDTO[]>();
		this.characters = [];
		this.editableCharacter = new CharacterDTO();
	}

	ngOnInit(){
		this.getAllCharacters();
	}

	//Recibe del servicio todos los personajes y los almacena en una variable que luego enviará a la lista/tabla hija.
	getAllCharacters(){
		this.service.getCharacters().subscribe({
			next: data => {
				this.characters = data;
			},
			error: err => console.log("err")
		});
	}

	//Recibe de la lista/tabla el personaje a editar y lo almacena en una variable para enviárselo
	// luego al formulario para que lo muestre.
	public editChar(character:CharacterDTO){
		this.editableCharacter = character;
	}

}
