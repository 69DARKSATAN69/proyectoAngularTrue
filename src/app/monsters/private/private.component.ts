import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';
import { MonsterServiceService } from '../services/monster-service.service';
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
this.displayedColumns = ['id', 'game', 'name', 'actions'];
this.monsterList$ = new Observable;
this.monsterList = [];
}

getMonsterList():void{

  this.fetcher.getMonsterList().subscribe((data:MonsterDTO[])=>{this.monsterList = data; 
  this.dataSource = new MatTableDataSource<MonsterDTO>(this.monsterList);}
  );
this.monsterList$ = this.fetcher.getMonsterList();

}

ngOnInit(){
  this.getMonsterList();
}

}

