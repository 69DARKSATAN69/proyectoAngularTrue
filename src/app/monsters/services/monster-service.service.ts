import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterServiceService {

  url:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000';
   }

getMonsterList():Observable<MonsterDTO[]>{
  return this.http.get<MonsterDTO[]>(this.url+'/monsters');
}

getOneMonster(id:number):Observable<MonsterDTO>{
 return this.http.get<MonsterDTO>(this.url + `/monsters/${id}`);
}

postMonster(body:MonsterDTO):Observable<MonsterDTO>{
 return this.http.post<MonsterDTO>(this.url +'/monsters', body);
}

deleteMonster(id:number):Observable<MonsterDTO>{
 return this.http.delete<MonsterDTO>(this.url + `/monsters/${id}`);
}

editMonster(id:number, body:MonsterDTO){
 return this.http.put<MonsterDTO>(this.url + `/monsters/${id}`, body);
}

}
