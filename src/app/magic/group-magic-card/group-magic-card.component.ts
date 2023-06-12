import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { SummonsDTO } from '../magicDTO/summonsDTO';
import { MagicService } from '../services/magic.service';
import { SpellsDTO } from '../magicDTO/spellsDTO';
import { Router } from '@angular/router';

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
  public principalImageSummon: string;
  public principalImageSpell: string;
  public loggedIn = false;

  constructor(private magicService: MagicService, private routes: Router) {
    this.spellsList$ = new Observable<SpellsDTO[]>();
    this.summonsList$ = new Observable<SummonsDTO[]>();
    this.principalImageSummon = 'https://i.imgur.com/bw4IuTl.png';
    this.principalImageSpell = 'https://i.imgur.com/btWFAtq.png';
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
    if (this.selectedMagic === 'summons') {
      this.getSummonsList(this.selectedGame);
      this.showMainImageSummon(this.selectedGame);
    } else if (this.selectedMagic === 'spells') {
      this.getSpellsList(this.selectedGame);
      this.showMainImageSpell(this.selectedGame);
    }
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
    if (sessionStorage.getItem('token')) {
      this.loggedIn = true;
    }
  }

  openEditList() {
    this.routes.navigate(['magic/private']);
  }

  showMainImageSummon(game: string) {
    switch (game) {
      case 'X': {
        this.principalImageSummon = 'https://i.imgur.com/R1bzVAr.png';
        break;
      }
      case 'XV': {
        this.principalImageSummon = 'https://i.imgur.com/k69kNSA.png';
        break;
      }
      default: {
        this.principalImageSummon = 'https://i.imgur.com/bw4IuTl.png';
        break;
      }
    }
  }
  showMainImageSpell(game: string) {
    switch (game) {
      case 'X': {
        this.principalImageSpell = 'https://i.imgur.com/V82wbSx.png';
        break;
      }
      case 'XV': {
        this.principalImageSpell = 'https://i.imgur.com/3R7yufW.png';
        break;
      }
      default: {
        this.principalImageSpell = 'https://i.imgur.com/btWFAtq.png';
        break;
      }
    }
  }
}
