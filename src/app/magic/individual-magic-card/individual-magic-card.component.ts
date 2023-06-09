import { Component } from '@angular/core';
import { SpellsDTO } from '../magicDTO/spellsDTO';
import { SummonsDTO } from '../magicDTO/summonsDTO';
import { MagicService } from '../services/magic.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-individual-magic-card',
  templateUrl: './individual-magic-card.component.html',
  styleUrls: ['./individual-magic-card.component.css'],
})
export class IndividualMagicCardComponent {
  public individualMagic$: Observable<any>;
  public magicType: string = '';
  public columnsToShow = {};

  constructor(route: ActivatedRoute, private service: MagicService) {
    this.individualMagic$ = new Observable<SpellsDTO | SummonsDTO>();

    route.params.subscribe((params) => {
      const { magicType, id } = params;
      this.magicType = magicType;
      if (magicType === 'summons') {
        this.individualMagic$ = this.service.getSummonById(id);
        this.columnsToShow = this.displayedColumnsSummon;
      }
      if (magicType === 'spells') {
        this.individualMagic$ = this.service.getSpellById(id);
        this.columnsToShow = this.displayedColumnSpell;
      }
    });
  }

  displayedColumnsSummon = {
    game: 'Game',
    location: 'Obtained',
    'magic-materia': 'Materia',
    element: 'Element',
    MP: 'MP',
    level: 'Level',
    Attack: 'Attack',
    Attributes: 'Attributes',
    effect: 'Effect',
    info: 'About',
    damage: 'Calculated damage',
  };

  displayedColumnSpell = {
    type: 'Type',
    game: 'Game',
    required: 'Required',
    effect: 'Effect',
    MP: 'MP',
    level: 'Level',
    power: 'Power',
    use: 'Use',
    damage: 'Calculated damage',
  };
}
