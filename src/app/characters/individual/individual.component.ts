import { Component } from '@angular/core';
import { CharacterDTO } from '../characterDTO/characterDTO';
import { Observable } from 'rxjs/internal/Observable';

const ELEMENT_DATA: CharacterDTO[] = [
	{name: 'Tidus', alignment: 'Good', height: 1.70, game: 'FF X', weapon: 'Caladbolg', id: 0, image: '', recap: '', info: ''}]

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent {
	public character;

	constructor(){
		this.character = new Observable<CharacterDTO[]>();
	}

	displayedColumns: string[] = ['name', 'alignment', 'height', 'game', 'weapon'];
	dataSource = ELEMENT_DATA;
}
