import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CharacterDTO } from '../../characterDTO/characterDTO';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CharacterServiceService } from '../../services/character-service.service';


let ELEMENT_DATA: CharacterDTO[] = [];

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'name', 'alignment', 'height', 'game', 'weapon', 'actions'];
	dataSource = new MatTableDataSource<CharacterDTO>(ELEMENT_DATA);

	@Input() characters:CharacterDTO[];

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

	ngAfterViewInit() {
		ELEMENT_DATA = this.characters;
	}
}
