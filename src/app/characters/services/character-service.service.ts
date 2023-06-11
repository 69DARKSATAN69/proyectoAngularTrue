import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {
	private urlApi = 'http://localhost:3000/characters';
	public resultado:any;


  constructor(private http:HttpClient) {}

  public getCharacters():Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi);	
  }

  public getCharactersByGame(game:string):Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi).pipe(
		map(data => data.filter(character => character.game === game)));
  }

  public getCharacterById(id:number):Observable<CharacterDTO>{
	let urlCharacter = this.urlApi + "/" + id;
	return this.http.get<CharacterDTO>(urlCharacter);
  }

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

  public putCharacter(id:number, character: CharacterDTO):Observable<CharacterDTO>{
    let url = this.urlApi + "/" + id;
    return this.http.put<CharacterDTO>(url, character);
  }

  public deleteCharacter(id:number){
    let url = this.urlApi + "/" + id;
    this.http.delete<CharacterDTO>(url).subscribe({
		next: (data) => {
			this.resultado.push(data);
		},
		error: (error) => {
			console.log(error)
		}
	});
  }
}
