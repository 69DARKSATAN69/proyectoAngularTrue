import { Component } from '@angular/core';
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

	constructor(private formBuilder:FormBuilder, private service:CharacterServiceService){
		this.characterForm = this.formBuilder.group({});	
	}

	private createForm(){
		this.characterForm = this.formBuilder.group({
			name: ["",[Validators.required]],
			image: ["",[Validators.required]],
			alignment: ["",[Validators.required]],
			height: ["",[Validators.required]],
			game: ["",[Validators.required]],
			weapon: ["",[Validators.required]],
			recap: ["",[Validators.required]],
			info: ["",[Validators.required]]
		});
	}

	public ngOnInit(){
		this.createForm();
	}

	createCharacter(){
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
}
