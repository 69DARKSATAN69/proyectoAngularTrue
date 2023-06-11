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
public monsterList$:Observable<MonsterDTO[]>;
public monsterList:MonsterDTO[];
public displayedColumns: string[]; 
public dataSource = new MatTableDataSource<MonsterDTO>();
public showForm:boolean;
public buttonMsg:string;
public isEditing:boolean;
public formGroup: FormGroup
public formSubmitted:boolean;
private monsterEditing: MonsterDTO;

constructor(private fetcher:MonsterServiceService, private formBuilder:FormBuilder, ){
  //No interesa mostrar todo de todos los monstruos, sólo lo suficiente para identificarlos. 'Actions' es para editar y borrar.
  //showForm gobierna si se muestra el formulario o la lista, buttonMsg es el mensaje para el botón que gobierna esta variable a su vez
  //isEditing, como su nombre indica, comprueba si el formulario se está usando o no para editar un monstruo.
  //El formgroup es necesario para el formulario reactivo, monsterEditing es el monstruo elegido para editar (cuyos datos van al formulario)
  //Por último, formSubmitted comprueba si se envió el formulario para mostrar el mensaje relevante.
this.displayedColumns = ['id', 'game', 'name', 'actions'];
this.monsterList$ = new Observable;
this.monsterList = [];
this.showForm = false;
this.buttonMsg = 'Show monster entry form';
this.isEditing = false;
this.formGroup = formBuilder.group({});
this.monsterEditing = new MonsterDTO;
this.formSubmitted = false;
}

public getMonsterList():void{
//Utiliza el servicio de monstruos para obtener la lista del servidor y mediante una subscripción mete esa lista en una variable.
//Esa variable es entonces utilizada para dibujar la tabla de material.
//La suscripción llama a crear formulario para que el validador de mínimo de id contenga la length apropiada de la lista de monstruos.
//El observable monsterList$ está ahi para hacer a la página esperar por la asincronía, no tiene verdadero valor por sí solo.

  this.fetcher.getMonsterList().subscribe((data:MonsterDTO[])=>{this.monsterList = data; 
  this.dataSource = new MatTableDataSource<MonsterDTO>(this.monsterList);
this.formCreation();}
  );
this.monsterList$ = this.fetcher.getMonsterList();

}

ngOnInit(){
  //Dibuja la tabla cuando se monta el componente.
  this.getMonsterList();
  this.formCreation();
}

public changeView():void{
  //Esta función es la que se llama desde el evento de pulsar en el evento de mostrar formulario/lista. Cambia el boolean showForm 
  // a su contrario y el texto del botón al apropiado para lo que se esté mostrando en ese momento.
  //También resetea el valor de formSubmitted, ocultando el mensaje de formulario enviado cuando se sale del propio formulario.
  this.showForm = !this.showForm;
  this.buttonMsg = this.showForm ? 'Show monster info list' : 'Show monster entry form';
  this.formSubmitted = false;
}

public deleteMonster(id:number):void{
  //Utiliza el servicio de monstruos para borrar, recibiendo la id del monstruo cuya fila tiene el botón pulsado.
  //Tras eso, la lista de monstruos sacada de la subscripción es filtrada para eliminar el monstruo borrado de ella y redibujar la tabla.
  //Esto hace que la tabla reaccione a los borrados inmediatamente sin necesidad de refrescar la página.
  this.fetcher.deleteMonster(id).subscribe();
  this.monsterList = this.monsterList.filter((monster)=>monster.id !== id);
  this.dataSource.data = this.monsterList;

}

private formCreation():void{
  //función sencilla de crear formulario de base, se llama al montar el componente, hace poco mas que cargar los controles y validadores.
  //la id debe tener como mínimo uno más del tamaño de la lista de monstruos.
  this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        image: [''],
        moneyDrop: [ 0, [Validators.required, Validators.min(0)]],
        game: [ '', [Validators.required]],
        drops: [ ''],
        type: [ '', [Validators.required]],
        id: [ 0, [Validators.required, Validators.min(this.monsterList.length+1)]]
      });

}

private formEditCreation():void{
  //esta función se utiliza cuando se intenta editar un monstruo. Recrea el formGroup utilizando los datos del monstruo seleccionado.
  //para los drops, toma el array de strings y lo une, separando cada uno con una coma.
  //En este caso la id no tiene validador de mínimo puesto que tiene que ser una en concreto, además, en el template queda como readonly.
  this.formGroup = this.formBuilder.group({
    name: [this.monsterEditing.name || '', [Validators.required]],
    image: [this.monsterEditing.image || ''],
    moneyDrop: [ this.monsterEditing.moneyDrop || 0, [Validators.required, Validators.min(0)]],
    game: [ this.monsterEditing.game || '', [Validators.required]],
    drops: [this.monsterEditing.drops.join(',')],
    type: [this.monsterEditing.type || '', [Validators.required]],
    id: [ this.monsterEditing.id || 0, [Validators.required]]
  });
}

public editStart(monster:MonsterDTO):void{
  //esta función es la que llama cada botón de edit. Toma los datos del monstruo a editar, los guarda en la variable monsterEditing,
  //cambia el valor de la variable isEditing a true para modificar partes del template, muestra el formulario, oculta la lista y 
  //rellena el formulario con los datos del monstruo a editar.
  this.monsterEditing = monster;
  this.isEditing = true;
  this.changeView();
  this.formEditCreation();
}

private createDropArray(dropString:string):string[]{
  //esta función recibe el string de drops del formulario y lo convierte en array de strings, que es el tipo de dato que recibe el DTO.
  //utiliza la coma para el split, que es lo que pido en el formulario que use el usuario para separar sus items.
  return dropString.split(',');
}

public getError(controlName: string):string {
  //Comprueba si el grupo de control del formulario tiene algún error, y de ser el caso muestra un mensaje relevante en el span bajo el input.
  let error = '';
  const control = this.formGroup.get(controlName);
  if (control?.errors) {
    if(control.errors['required']){
    error = 'We need this input, champ';

    } if(control.errors['min']){
      error += `Value must be at least ${control.errors['min'].min}`;
 
    }
    

    
  }
  return error;
    }




public testForm():void{
  //función sencilla de testing para ver si el formulario hace lo que debe
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  console.log('El formgroup tiene: ', formData);
}

public newMonster():void{
  //función para crear nuevo monstruo siguiendo los datos del formulario. Saca los valores del formulario del objeto formGroup,
  //modifica el de drops a ser un array de strings siguiendo la función createDropArray y los manda al servidor utilizando el servicio.
  if(this.formGroup.invalid){
    return;
  }
  this.formSubmitted = true;
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  this.fetcher.postMonster(formData).subscribe((newMonster:MonsterDTO)=>{
    this.monsterList.push(newMonster);
    this.dataSource.data = this.monsterList;
    this.cancelEdit();
  });
}

public cancelEdit():void{
  //función para salir del proceso de editado, vaciando el formulario y reseteando las variables.
  this.monsterEditing = new MonsterDTO;
  this.isEditing = false;
  this.formCreation();
}

public editMonster():void{
  //función a la que llama el botón de mandar el formulario en el proceso de editación. Corta la función si los validadores no están satisfechos,
  //y si lo están toma los valores, transforma el string de drops a array de strings y utiliza el servicio para enviarlo al servidor.
  //Dentro del suscribe busca en qué lugar del array monsterList estaba el monstruo editado, lo reemplaza por los nuevos datos y refresca
  //la datasource con la nueva lista resultante. Acto seguido, llama a la función anterior para resetear todo.
  if(this.formGroup.invalid){
    return;
  }
  this.formSubmitted = true;
  let formData = {...this.formGroup.value};
  formData.drops = this.createDropArray(formData.drops);
  this.fetcher.editMonster(this.monsterEditing.id, formData).subscribe((editedMonster: MonsterDTO) => 
  {
    const index = this.monsterList.findIndex(monster => monster.id === editedMonster.id);
    if (index !== -1) {
      this.monsterList[index] = formData;
      this.dataSource.data = this.monsterList;
    };
    
});
  this.cancelEdit();
}

}

