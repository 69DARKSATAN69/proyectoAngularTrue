/* 
  **************************************************************
	Individual page.
	Página de personaje individual donde se mostrará la información en más detalle.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Component } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { CharacterServiceService } from '../services/character-service.service';

//Fuente de datos de la tabla.
const ELEMENT_DATA: Observable<CharacterDTO>[] = [];

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent {
	public individualCharacter$:Observable<CharacterDTO>;

	constructor(route:ActivatedRoute, private service:CharacterServiceService){
		this.individualCharacter$ = new Observable<CharacterDTO>();

		//Aquí estoy recibiendo el id del personaje por parámetro de URL y con ella llamo al servicio
		//para obtener el personaje con esa id y así guardarlo en el observable y mostrarlo en el HTML por medio
		//del pipe async.
			route.params.subscribe(params => {		
				if(Object.keys(params).length != 0){	
					this.individualCharacter$ = this.service.getCharacterById(params['characterId']);
					ELEMENT_DATA.push(this.individualCharacter$);	
				}
			})
	}

	//Estas son las columnas de la tabla que mostraré.
	displayedColumns: string[] = ['name', 'alignment', 'height', 'game', 'weapon'];
	
	//Aquí apunto  la fuente de datos de la tabla.
	dataSource = ELEMENT_DATA;
}
