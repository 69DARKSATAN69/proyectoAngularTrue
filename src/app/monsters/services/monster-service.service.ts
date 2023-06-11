import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterServiceService {

  private url:string;
  constructor(private http:HttpClient) {
    this.url = 'http://localhost:3000';
   }

public getMonsterList():Observable<MonsterDTO[]>{
  return this.http.get<MonsterDTO[]>(this.url+'/monsters');
}

public getOneMonster(id:number):Observable<MonsterDTO>{
 return this.http.get<MonsterDTO>(this.url + `/monsters/${id}`);
}

public postMonster(body:MonsterDTO):Observable<MonsterDTO>{
 return this.http.post<MonsterDTO>(this.url +'/monsters', body);
}

public deleteMonster(id:number):Observable<MonsterDTO>{
 return this.http.delete<MonsterDTO>(this.url + `/monsters/${id}`);
}

public editMonster(id:number, body:MonsterDTO){
 return this.http.put<MonsterDTO>(this.url + `/monsters/${id}`, body);
}

}
