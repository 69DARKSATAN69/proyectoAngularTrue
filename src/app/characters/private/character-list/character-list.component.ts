/* 
  **************************************************************
	Lista con los personajes.
	Muestra todos los personajes que hay en el json-server. Permite editarlos y borrarlos de forma individual.

	Recibe por input un array con todos los personajes a mostrar.
	Envía por output al padre (para que este luego envíe al formulario) el personaje a editar.

	Se gestiona el borrado de personajes desde aquí.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CharacterDTO } from '../../characterDTO/characterDTO';
import { CharacterServiceService } from '../../services/character-service.service';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent {
	//Columnas a mostrar en la tabla.
	displayedColumns: string[] = ['id', 'name', 'alignment', 'height', 'game', 'weapon', 'actions'];

	//Array de personajes que se muestran en la lista.
	@Input() characters:CharacterDTO[];
	//Se envía al padre el personaje para el que se pulsó el botón de "edit".
	@Output() characterToEdit = new EventEmitter<CharacterDTO>();

	constructor(private service:CharacterServiceService){
		this.characters = [];
	}

	//Estuve meditando si usar un Emitter para borrar y editar los personajes desde el padre, pero al final he optado
	//por hacerlo desde los hijos porque me parece que no tiene mucha lógica coger algo que es del hijo en sí y
	//llevarlo al padre y hacer la acción que sea desde allí.
	deleteCharacter(id:number){
		this.service.deleteCharacter(id);
		window.location.reload();
	}

	//Como es entre componentes hermanos, le paso con un Emitter el personaje a editar al padre (private) para que este luego 
	//se lo pase al otro hijo.
	editCharacter(character:CharacterDTO){
		this.characterToEdit.emit(character);
		window.scrollTo(0, 0);
	}

}
