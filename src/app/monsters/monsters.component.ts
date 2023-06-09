import { Component } from '@angular/core';
import { MonsterServiceService } from './services/monster-service.service';
import { Observable, map } from 'rxjs';
import { MonsterDTO } from './DTOclasses/monsterDTO';


@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.css'],

})

//este componente es la lista pública de monstruos. Los muestra como un grid de tarjetas de angular material junto con una imagen 
//de algún jefe del juego seleccionado por el usuario.
export class MonstersComponent {
selectedGame:string;
monsterList$:Observable<MonsterDTO[]>
isLoggedIn:boolean;
  constructor(private fetcher:MonsterServiceService){
this.monsterList$ = new Observable<MonsterDTO[]>;
this.selectedGame = 'VII';
//la variable isLoggedIn es la existencia del token, hecha como una conversión a boolean de su estado mediante la doble negación.
this.isLoggedIn = !!sessionStorage.getItem('token');
  }
//esta funcion selecciona de toda la lista de monstruos solo aquellos cuyo juego (en el atributo game) coincide con el seleccionado
//por el usuario
public getList():void{
 this.monsterList$ = this.fetcher.getMonsterList().pipe(map(monsters => monsters.filter(monster => monster.game === this.selectedGame)));
}

//al montarse el componente, directamente se pinta la lista
ngOnInit(){
  this.getList();
}
//esta es la función del select. Pasa el valor del juego seleccionado a la variable selectedGame y vuelve a pintar la lista.
selectGame(game:string){
this.selectedGame = game;
this.getList();
}
}
