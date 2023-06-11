import { Component } from '@angular/core';
import { CharacterServiceService } from '../services/character-service.service';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { Observable } from 'rxjs/internal/Observable';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent {
	public characterArray$:Observable<CharacterDTO[]>;
	public characters:CharacterDTO[];

	constructor(private service:CharacterServiceService){
		this.characterArray$ = new Observable<CharacterDTO[]>();
		this.characters = [];
	}

	ngOnInit(){
		this.getAllCharacters();
	}

	getAllCharacters(){
		this.service.getCharacters().subscribe({
			next: data => {
				this.characters = data;
			},
			error: err => console.log("err")
		});
	}

}
