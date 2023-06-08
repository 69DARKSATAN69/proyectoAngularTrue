import { Component } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';
import { CharacterServiceService } from '../services/character-service.service';

const ELEMENT_DATA: Observable<CharacterDTO>[] = [];

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent {
	public characterObj:CharacterDTO;
	public individualCharacter$;

	constructor(route:ActivatedRoute, private service:CharacterServiceService){
		this.characterObj = new CharacterDTO();
		this.individualCharacter$ = new Observable<CharacterDTO>();

			route.params.subscribe(params => {		
				if(Object.keys(params).length != 0){	
					this.individualCharacter$ = this.service.getCharacterById(params['characterId']);
					ELEMENT_DATA.push(this.individualCharacter$);	
				}
			})
	}

	displayedColumns: string[] = ['name', 'alignment', 'height', 'game', 'weapon'];
	dataSource = ELEMENT_DATA;
}
