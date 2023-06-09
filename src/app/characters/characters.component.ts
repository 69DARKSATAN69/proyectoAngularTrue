import { Component } from '@angular/core';
import { CharacterServiceService } from './services/character-service.service';
import { Observable } from 'rxjs/internal/Observable';
import { CharacterDTO } from './characterDTO/characterDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {
	public characterObservable$;
	public mainImage:string;
	public loggedIn = false;

	constructor(private serviceCharacter:CharacterServiceService, private rutas:Router){
		this.characterObservable$ = new Observable<CharacterDTO[]>();	
		this.mainImage = 'https://i.imgur.com/TNa7unG.png';
	}

	ngOnInit(){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame("VII");
		if (sessionStorage.getItem('token')){
			this.loggedIn = true;
		}
	}

	onSelected(value:string){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame(value);
		this.showMainImage(value);
	}

	showCharacter(id:number){
		let urlCharacter = "characters/individual/" + id;
		window.open(urlCharacter);
	}

	showMainImage(game:string){
		switch(game) { 
			case 'X': { 
				this.mainImage = 'https://i.imgur.com/y6wasHZ.png';
			break; 
			} 
			case 'XV': { 
				this.mainImage = 'https://i.imgur.com/tCPhSXP.png';
			break; 
			} 
			default: { 
				this.mainImage = 'https://i.imgur.com/TNa7unG.png'; 
			break; 
			} 
		}
	}

	openModifyList(){
		this.rutas.navigate(["characters/private"]);
	}
}