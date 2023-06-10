import { Component } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { SummonsDTO } from '../magicDTO/summonsDTO';
import { MagicService } from '../services/magic.service';
import { SpellsDTO } from '../magicDTO/spellsDTO';

@Component({
  selector: 'app-group-magic-card',
  templateUrl: './group-magic-card.component.html',
  styleUrls: ['./group-magic-card.component.css'],
})
export class GroupMagicCardComponent {
  spellsList$: Observable<SpellsDTO[]>;
  summonsList$: Observable<SummonsDTO[]>;
  selectedMagic: string = 'summons';
  selectedGame: string = 'VII';

  constructor(private magicService: MagicService) {
    this.spellsList$ = new Observable<SpellsDTO[]>();
    this.summonsList$ = new Observable<SummonsDTO[]>();
  }

  public getSummonsList(game: string): void {
    this.magicService
      .getSummonsList()
      .pipe(map((summons) => summons.filter((summon) => summon.game === game)))
      .subscribe((summonsList: SummonsDTO[]) => {
        this.summonsList$ = of(summonsList);
      });
  }

  public getSpellsList(game: string): void {
    this.magicService
      .getSpellsList()
      .pipe(map((spells) => spells.filter((spell) => spell.game === game)))
      .subscribe((spellsList: SpellsDTO[]) => {
        this.spellsList$ = of(spellsList);
      });
  }

  onSelectedMagic() {
    if (this.selectedMagic === 'spells') {
      this.getSpellsList(this.selectedGame);
    } else if (this.selectedMagic === 'summons') {
      this.getSummonsList(this.selectedGame);
    }
  }

  onSelectedGame() {
    if (this.selectedMagic === 'summons')
      this.getSummonsList(this.selectedGame);
    else if (this.selectedMagic === 'spells')
      this.getSpellsList(this.selectedGame);
  }

  showSpell(id: number) {
    let urlSpell = 'spells/individual/' + id;
    window.open(urlSpell);
  }

  showSummon(id: number) {
    let urlSummon = 'summons/individual/' + id;
    window.open(urlSummon);
  }

  ngOnInit() {
    this.getSummonsList(this.selectedGame);
    this.getSpellsList(this.selectedGame);
  }
}
