import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';
import { MonsterServiceService } from '../services/monster-service.service';
//Este componente contedrá la lógica para mostrar la lista de todos los monstruos y el formulario para crear nuevos o editar existentes.
//Además de la lógica para borrarlos. 

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent {
monsterList$:Observable<MonsterDTO[]>;
monsterList:MonsterDTO[];
displayedColumns: string[]; 
dataSource = new MatTableDataSource<MonsterDTO>();


constructor(private fetcher:MonsterServiceService){
  //No interesa mostrar todo de todos los monstruos, sólo lo suficiente para identificarlos. 'Actions' es para editar y borrar.
this.displayedColumns = ['id', 'game', 'name', 'actions'];
this.monsterList$ = new Observable;
this.monsterList = [];
}

getMonsterList():void{
//Utiliza el servicio de monstruos para obtener la lista del servidor y mediante una subscripción mete esa lista en una variable.
//Esa variable es entonces utilizada para dibujar la tabla de material.
//El observable monsterList$ está ahi para hacer a la página esperar por la asincronía, no tiene verdadero valor por sí solo.
  this.fetcher.getMonsterList().subscribe((data:MonsterDTO[])=>{this.monsterList = data; 
  this.dataSource = new MatTableDataSource<MonsterDTO>(this.monsterList);}
  );
this.monsterList$ = this.fetcher.getMonsterList();

}

ngOnInit(){
  //Dibuja la tabla cuando se monta el componente.
  this.getMonsterList();
}

deleteMonster(id:number):void{
  //Utiliza el servicio de monstruos para borrar, recibiendo la id del monstruo cuya fila tiene el botón pulsado.
  //Tras eso, la lista de monstruos sacada de la subscripción es filtrada para eliminar el monstruo borrado de ella y redibujar la tabla.
  //Esto hace que la tabla reaccione a los borrados inmediatamente sin necesidad de refrescar la página.
  this.fetcher.deleteMonster(id).subscribe((data:MonsterDTO)=>console.log(data));
  this.monsterList = this.monsterList.filter((monster)=>monster.id !== id);
  this.dataSource = new MatTableDataSource<MonsterDTO>(this.monsterList);
}

}

