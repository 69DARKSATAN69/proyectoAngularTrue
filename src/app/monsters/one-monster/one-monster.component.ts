import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';
import { MonsterServiceService } from '../services/monster-service.service';

//Este componente muestra toda la información sobre el monstruo seleccionado en la lista pública (ruta /monsters). 

@Component({
  selector: 'app-one-monster',
  templateUrl: './one-monster.component.html',
  styleUrls: ['./one-monster.component.css']
})
export class OneMonsterComponent {
  //No hay mucho que explicar, recibe la id de la ruta mediante el ActivatedRoute, lo utiliza junto con el servicio de monstruos
  //para coger la información del monstruo seleccionado y lo pasa como observable para luego utilizarlo con async en la plantilla.
id:number;
oneMonster$:Observable<MonsterDTO>;
convertingToEur:boolean;
constructor(private fetcher:MonsterServiceService, private router:ActivatedRoute){
this.id = 0;
this.oneMonster$ = new Observable;
this.convertingToEur = false;
this.router.params.subscribe(params => {
  this.id = params['id'] || 0;
});
}

getMonster():void{
  //aquí es donde se asigna el observable del servicio a una variable del componente.
  this.oneMonster$ = this.fetcher.getOneMonster(this.id);
}

ngOnInit(){
  //se llama a la función anterior al montar el componente.
  this.getMonster();
}

toggleConvert():void{
  //esta función sencillamente gobierna si se enseña el valor de dinero soltado por el monstruo original o convertido a euros con la pipe.
this.convertingToEur = !this.convertingToEur;
}



}
