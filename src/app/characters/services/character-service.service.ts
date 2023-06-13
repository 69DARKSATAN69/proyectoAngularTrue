/* 
  **************************************************************
	CharacterServiceService.
	Donde se hace todo el CRUD contra el JSON-server.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/pages/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {
	private urlApi = 'http://localhost:3000/characters';
	public resultado:any;


	//Inyecto HttpClient que será quien me permita hacer la conexión con el webservice.
  constructor(private http:HttpClient) {}

  //Obtengo todos los personajes.
  public getCharacters():Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi);	
  }

  //Obtengo los personajes según el juego recibido por parámetro.
  public getCharactersByGame(game:string):Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi).pipe(
		map(data => data.filter(character => character.game === game)));
  }

  //Obtengo un personaje según su ID.
  public getCharacterById(id:number):Observable<CharacterDTO>{
	let urlCharacter = this.urlApi + "/" + id;
	return this.http.get<CharacterDTO>(urlCharacter);
  }

  //Guardo un personaje nuevo.
  //next: y error: es la nueva nomenclatura para usar el subscribe sin que lo marque como deprecado
  public postCharacter(character:CharacterDTO){
	this.http.post<CharacterDTO>(this.urlApi, character).subscribe({
		next: (data) => {
			this.resultado = [];
			this.resultado.push(data);
		},
		error: (error) => {
			console.log(error)
		}
	});
  }

  //Edito un personaje según el id.
  public editCharacter(id:number, character: CharacterDTO){

    let url = this.urlApi + "/" + id;
    this.http.put<CharacterDTO>(url, character).subscribe({
		next: (data) => {
			this.resultado = [];
			this.resultado.push(data);
		},
		error: (error) => {
			console.log(error)
		}
	});
  }

  //Borro un personaje según su id.
   public deleteCharacter(id:number):Observable<CharacterDTO>{
	 	let url = this.urlApi + "/" + id;
		return this.http.delete<CharacterDTO>(url);
	}
	   
}
