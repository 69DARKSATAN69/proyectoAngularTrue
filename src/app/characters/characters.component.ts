import { Component } from '@angular/core';
import { CharacterServiceService } from './services/character-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { CharacterDTO } from './characterDTO/characterDTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
	public characterObservable$;



	constructor(private serviceCharacter:CharacterServiceService){
		this.characterObservable$ = new Observable<CharacterDTO[]>();	
	}

	ngOnInit(){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame("VII");
	}

	onSelected(value:string){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame(value);
	}

	showCharacter(id:number){
		let urlCharacter = "characters/individual/" + id;
		window.open(urlCharacter);
	}
}
