import { Injectable } from '@angular/core';
import { SummonsDTO } from '../magicDTO/summonsDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpellsDTO } from '../magicDTO/spellsDTO';

@Injectable({
  providedIn: 'root',
})
export class MagicService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000';
  }
  //summons API services
  getSummonsList(): Observable<SummonsDTO[]> {
    return this.http.get<SummonsDTO[]>(this.url + '/summons');
  }
  getSummonById(id: number): Observable<SummonsDTO> {
    return this.http.get<SummonsDTO>(this.url + `/summons/${id}`);
  }
  createSummon(body: SummonsDTO): Observable<SummonsDTO> {
    return this.http.post<SummonsDTO>(this.url + '/summons', body);
  }
  deleteSummon(id: number): Observable<SummonsDTO> {
    return this.http.delete<SummonsDTO>(this.url + `/summons/${id}`);
  }
  editSummon(id: number, body: SummonsDTO) {
    return this.http.put<SummonsDTO>(this.url + `/summons/${id}`, body);
  }

  //spells API services
  getSpellsList(): Observable<SpellsDTO[]> {
    return this.http.get<SpellsDTO[]>(this.url + '/spells');
  }
  getSpellById(id: number): Observable<SpellsDTO> {
    return this.http.get<SpellsDTO>(this.url + `/spells/${id}`);
  }
  createSpell(body: SpellsDTO): Observable<SpellsDTO> {
    return this.http.post<SpellsDTO>(this.url + '/spells', body);
  }
  deleteSpell(id: number): Observable<SpellsDTO> {
    return this.http.delete<SpellsDTO>(this.url + `/spells/${id}`);
  }
  editSpell(id: number, body: SpellsDTO) {
    return this.http.put<SpellsDTO>(this.url + `/spells/${id}`, body);
  }
}
