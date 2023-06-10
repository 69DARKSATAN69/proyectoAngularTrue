import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonsterDTO } from '../DTOclasses/monsterDTO';
import { Observable } from 'rxjs';
import { MonsterServiceService } from '../services/monster-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
showForm:boolean;
buttonMsg:string;
isEditing:boolean;
formGroup: FormGroup
monsterEditing: MonsterDTO;

constructor(private fetcher:MonsterServiceService, private formBuilder:FormBuilder, ){
  //No interesa mostrar todo de todos los monstruos, sólo lo suficiente para identificarlos. 'Actions' es para editar y borrar.
this.displayedColumns = ['id', 'game', 'name', 'actions'];
this.monsterList$ = new Observable;
this.monsterList = [];
this.showForm = false;
this.buttonMsg = 'Show monster entry form';
this.isEditing = false;
this.formGroup = formBuilder.group({});
this.monsterEditing = new MonsterDTO;
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
  this.formCreation();
}

changeView(){
  //Esta función es la que se llama desde el evento de pulsar en el evento de mostrar formulario/lista. Cambia el boolean showForm 
  // a su contrario y el texto del botón al apropiado para lo que se esté mostrando en ese momento.
  this.showForm = !this.showForm;
  this.buttonMsg = this.showForm ? 'Show monster info list' : 'Show monster entry form';
}

deleteMonster(id:number):void{
  //Utiliza el servicio de monstruos para borrar, recibiendo la id del monstruo cuya fila tiene el botón pulsado.
  //Tras eso, la lista de monstruos sacada de la subscripción es filtrada para eliminar el monstruo borrado de ella y redibujar la tabla.
  //Esto hace que la tabla reaccione a los borrados inmediatamente sin necesidad de refrescar la página.
  this.fetcher.deleteMonster(id).subscribe((data:MonsterDTO)=>console.log(data));
  this.monsterList = this.monsterList.filter((monster)=>monster.id !== id);
  this.dataSource = new MatTableDataSource<MonsterDTO>(this.monsterList);
}

formCreation(){
  //función sencilla de crear formulario de base, se llama al montar el componente, hace poco mas que cargar los controles y validadores.
  this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.maxLength(20)]],
        image: [''],
        moneyDrop: [ 0, [Validators.required, Validators.min(0)]],
        game: [ '', [Validators.required]],
        drops: [ ''],
        type: [ '', [Validators.required]],
        id: [ 0]
      });
}

formEditCreation(){
  //esta función se utiliza cuando se intenta editar un monstruo. Recrea el formGroup utilizando los datos del monstruo seleccionado.
  //para los drops, toma el array de strings y lo une, separando cada uno con una coma.
  this.formGroup = this.formBuilder.group({
    name: [this.monsterEditing.name || '', [Validators.required, Validators.maxLength(20)]],
    image: [this.monsterEditing.image || ''],
    moneyDrop: [ this.monsterEditing.moneyDrop || 0, [Validators.required, Validators.min(0)]],
    game: [ this.monsterEditing.game || '', [Validators.required]],
    drops: [this.monsterEditing.drops.join(',')],
    type: [this.monsterEditing.type || '', [Validators.required]],
    id: [ this.monsterEditing.id || 0]
  });
}

testEdit(monster:any){
console.log(monster);
this.editStart(monster);
}

editStart(monster:MonsterDTO){
  //esta función es la que llama cada botón de edit. Toma los datos del monstruo a editar, los guarda en la variable monsterEditing,
  //cambia el valor de la variable isEditing a true para modificar partes del template, muestra el formulario, oculta la lista y 
  //rellena el formulario con los datos del monstruo a editar.
  this.monsterEditing = monster;
  this.isEditing = true;
  this.changeView();
  this.formEditCreation();
}

public createDropArray(dropString:string){
  //esta función recibe el string de drops del formulario y lo convierte en array de strings, que es el tipo de dato que recibe el DTO.
  //utiliza la coma para el split, que es lo que pido en el formulario que use el usuario para separar sus items.
  return dropString.split(',');
}

public getError(controlName: string) {
  //hay que dar un repaso a esto
  let error = '';
  const control = this.formGroup.get(controlName);
  if (control?.errors) {
    error = 'We need this input, champ';

  }
}

public testForm(){
  //función sencilla de testing para ver si el formulario hace lo que debe
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  console.log('El formgroup tiene: ', formData);
}

public newMonster(){
  //función para crear nuevo monstruo siguiendo los datos del formulario. Saca los valores del formulario del objeto formGroup,
  //modifica el de drops a ser un array de strings siguiendo la función createDropArray y los manda al servidor utilizando el servicio.
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  this.fetcher.postMonster(formData).subscribe((data:MonsterDTO)=>console.log(data));
}

public cancelEdit(){
  this.monsterEditing = new MonsterDTO;
  this.isEditing = false;
  this.formCreation();
}

public editMonster(){
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  this.fetcher.editMonster(this.monsterEditing.id, formData).subscribe((data:MonsterDTO)=>console.log(data));
  this.cancelEdit();
}

}

