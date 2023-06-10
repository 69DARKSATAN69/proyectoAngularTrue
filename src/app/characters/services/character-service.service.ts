import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {
	private urlApi = 'http://localhost:3000/characters';


  constructor(private http:HttpClient, private route:ActivatedRoute) {}

  getCharacters():Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi);	
  }

  getCharactersByGame(game:string):Observable<CharacterDTO[]>{
	return this.http.get<CharacterDTO[]>(this.urlApi).pipe(
		map(data => data.filter(character => character.game === game)));
  }

  getCharacterById(id:number){
	let urlCharacter = this.urlApi + "/" + id;
	return this.http.get<CharacterDTO>(urlCharacter);
  }
}
