import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { map } from 'rxjs/internal/operators/map';
import { filter } from 'rxjs/internal/operators/filter';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class CharacterServiceService {
	private urlApi = 'http://localhost:3000/characters';

  constructor(private http:HttpClient) { 
  }

  getCharactersByGame(game:string){
	return this.http.get<CharacterDTO[]>(this.urlApi).pipe(
		map(data => data.filter(character => character.game === game)));
  }
}
