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

monsterList$:Observable<MonsterDTO[]>
  constructor(private fetcher:MonsterServiceService){
this.monsterList$ = new Observable<MonsterDTO[]>;
  }

public getList():void{
 this.monsterList$ = this.fetcher.getMonsterList().pipe(map(monsters => monsters.filter(monster => monster.game === 'VII')));
}


ngOnInit(){
  this.getList();
}
}
