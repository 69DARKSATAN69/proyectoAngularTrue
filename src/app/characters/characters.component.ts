/* 
  **************************************************************
	Characters page.
	Página principal donde se ven los personajes según su juego.
	Hay un selector que permite elegir qué juego (VII por defecto), al cambiar muestra los personajes correspondientes.

	La imagen de la izquierda representa un personaje del juego seleccionado, cambia según qué juego sea.

	Las cards muestran una pequeña información sobre el personaje, y se muestra el nombre en verde/rojo según directiva.
	Si se hace click en ellas lleva a la página individual donde se ve toda la información disponible.

	Si se está logeado aparece el botón de "modify character list" debajo del selector de juego.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

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
	public characterObservable$:Observable<CharacterDTO[]>;
	public mainImage:string;
	public loggedIn:boolean = false;

	constructor(private serviceCharacter:CharacterServiceService, private rutas:Router){
		this.characterObservable$ = new Observable<CharacterDTO[]>();	
		this.mainImage = 'https://i.imgur.com/TNa7unG.png';
	}

	//Al iniciar cargo los personajes del juego por defecto y compruebo si el usuario está logueado.
	ngOnInit(){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame("VII");
		if (sessionStorage.getItem('token')){
			this.loggedIn = true;
		}
	}

	//Obtiene los personajes según se cambia el valor de juego en el selector.
	onSelected(value:string){
		this.characterObservable$ = this.serviceCharacter.getCharactersByGame(value);
		this.showMainImage(value);
	}

	//Abre en la misma pestaña la página individual del personaje de la card en la que se hace click.
	showCharacter(id:number | null){
		let urlCharacter = "characters/individual/" + id;
		window.open(urlCharacter, "_self");
	}

	//Coloca la imagen representativa según el juego que se seleccione.
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

	//Al hacer click en el botón "modify character list" se redirecciona a la sección privada.
	openModifyList(){
		this.rutas.navigate(["characters/private"]);
	}
}