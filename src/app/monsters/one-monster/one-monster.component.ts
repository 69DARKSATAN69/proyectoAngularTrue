import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';
import { MonsterServiceService } from '../services/monster-service.service';

@Component({
  selector: 'app-one-monster',
  templateUrl: './one-monster.component.html',
  styleUrls: ['./one-monster.component.css']
})
export class OneMonsterComponent {
id:number;
oneMonster$:Observable<MonsterDTO>;
constructor(private fetcher:MonsterServiceService, private router:ActivatedRoute){
this.id = 0;
this.oneMonster$ = new Observable;
this.router.params.subscribe(params => {
  this.id = params['id'] || 0;
});
}

getMonster():void{
  this.oneMonster$ = this.fetcher.getOneMonster(this.id);
}

ngOnInit(){
  this.getMonster();
}




}
