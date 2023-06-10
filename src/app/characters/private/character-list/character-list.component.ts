import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CharacterDTO } from '../../characterDTO/characterDTO';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


let ELEMENT_DATA: CharacterDTO[] = [];

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements AfterViewInit {
	displayedColumns: string[] = ['id', 'name', 'alignment', 'height', 'game', 'weapon', 'buttons'];
	dataSource = new MatTableDataSource<CharacterDTO>(ELEMENT_DATA);

	//@ViewChild(MatPaginator) paginator: MatPaginator;
	@Input() characters:CharacterDTO[];

	constructor(){
		this.characters = [];
	}

	ngAfterViewInit() {
		ELEMENT_DATA = this.characters;
		//this.dataSource.paginator = this.paginator;  
	}
}
