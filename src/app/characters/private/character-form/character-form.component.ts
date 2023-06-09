/* 
  **************************************************************
	Formulario de personaje para crear/editar.
	Permite, según el valor de la variable "editing", crear o editar un personaje.
	Si esta variable está a false, entonces se muestra el botón de crear, si está a true, entonces se muestra el de editar.

	Recibe por Input el personaje que se ha de editar.

	Fecha de entrega: 13/06/2023
	Dev: Andrea
  **************************************************************
*/

import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterDTO } from '../../characterDTO/characterDTO';
import { CharacterServiceService } from '../../services/character-service.service';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent {
	public characterForm:FormGroup;
	public formTitle:string;
	public editing;

	//Recibe del padre el personaje que va a editar.
	@Input() characterToEdit:CharacterDTO;

	constructor(private formBuilder:FormBuilder, private service:CharacterServiceService){
		this.characterForm = this.formBuilder.group({});	
		this.formTitle = "New Character";
		this.characterToEdit = new CharacterDTO();
		this.editing = false;
	}

	//Método donde creo el formulario reactivo con sus validators básicos para todos los campos obligatorios.
	private createForm(){
		this.characterForm = this.formBuilder.group({
			name: ["",[Validators.required]],
			image: ["",[Validators.required]],
			alignment: ["good",[Validators.required]],
			height: ["",[Validators.required]],
			game: ["VII",[Validators.required]],
			weapon: ["",[Validators.required]],
			recap: ["",[Validators.required]],
			info: ["",[Validators.required]]
		});
	}

	ngOnInit(){
		this.createForm();
	}

	//Uso este método porque se ejecuta cuando cambian propiedades input, así recojo el objeto cuando ya tiene datos que me llegan desde el padre y puedo usarlo.
	ngOnChanges(){
	
		//Con esto cambio el título/botón del formulario según se cree/edite.
		if(this.characterToEdit.id === null){
			this.formTitle = "New Character";
			this.editing = false;
		}else{
			this.formTitle = "Edit Character"
			this.editing = true;
		}

		//Se settean los valores del personaje a editar en los campos del formulario.
		this.characterForm.get('name')?.setValue(this.characterToEdit.name);
		this.characterForm.get('image')?.setValue(this.characterToEdit.image);
		this.characterForm.get('alignment')?.setValue(this.characterToEdit.alignment);
		this.characterForm.get('height')?.setValue(this.characterToEdit.height);
		this.characterForm.get('game')?.setValue(this.characterToEdit.game);
		this.characterForm.get('weapon')?.setValue(this.characterToEdit.weapon);
		this.characterForm.get('recap')?.setValue(this.characterToEdit.recap);
		this.characterForm.get('info')?.setValue(this.characterToEdit.info);
	}

	//Creo un nuevo objeto de personaje con los datos que recibo del formulario.
	createCharacter(){
		//Si el formulario no es inválido entonces guardo el objeto en el json-server.
		if(!this.characterForm.invalid){
			let character = new CharacterDTO(
				this.characterForm.value.name, 
				this.characterForm.value.image, 
				this.characterForm.value.alignment, 
				this.characterForm.value.height, 
				this.characterForm.value.game, 
				this.characterForm.value.weapon, 
				this.characterForm.value.recap, 
				this.characterForm.value.info
			);
			this.service.postCharacter(character);
			window.location.reload();
		}
	}

	
	editCharacter(){
		//Meto en un objeto los valores del formulario.
		let editedCharacter = new CharacterDTO();
		editedCharacter = {...this.characterForm.value};
		
		//Le asigno la id del personaje que me llega porque en el formulario no la tengo guardada de por si.
		editedCharacter.id = this.characterToEdit.id;

		//Envío el personaje a editar al servicio.
		this.service.editCharacter(editedCharacter.id!,editedCharacter);
		window.location.reload();
	}
}
