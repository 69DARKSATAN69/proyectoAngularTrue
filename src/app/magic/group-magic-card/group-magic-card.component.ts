import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  constructor(private fetcher: MagicService) {
    this.spellsList$ = new Observable<SpellsDTO[]>();
    this.summonsList$ = new Observable<SummonsDTO[]>();
  }

  public getSummonList(): void {
    this.summonsList$ = this.fetcher
      .getSummonsList()
      .pipe(
        map((summons) => summons.filter((summon) => summon.game === 'VII'))
      );
  }

  public getSpellsList(): void {
    this.spellsList$ = this.fetcher
      .getSpellsList()
      .pipe(map((spells) => spells.filter((spells) => spells.game === 'VII')));
  }

  ngOnInit() {
    this.getSummonList();
    this.getSpellsList();
  }
}
