import { Component } from '@angular/core';
import { MonsterServiceService } from './services/monster-service.service';
import { Observable, map } from 'rxjs';
import { MonsterDTO } from './DTOclasses/monsterDTO';

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css']
})
export class MonstersComponent {
selectedGame:string;
monsterList$:Observable<MonsterDTO[]>
isLoggedIn:boolean;
  constructor(private fetcher:MonsterServiceService){
this.monsterList$ = new Observable<MonsterDTO[]>;
this.selectedGame = 'VII';
this.isLoggedIn = !!sessionStorage.getItem('token');
  }

public getList():void{
 this.monsterList$ = this.fetcher.getMonsterList().pipe(map(monsters => monsters.filter(monster => monster.game === this.selectedGame)));
}


ngOnInit(){
  this.getList();
}

selectGame(game:string){
this.selectedGame = game;
this.getList();
}
}
