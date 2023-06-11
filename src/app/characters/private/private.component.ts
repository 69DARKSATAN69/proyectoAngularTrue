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

	getAllCharacters(){
		this.service.getCharacters().subscribe({
			next: data => {
				this.characters = data;
			},
			error: err => console.log("err")
		});
	}

	public editChar(character:CharacterDTO){
		this.editableCharacter = character;
	}

}
