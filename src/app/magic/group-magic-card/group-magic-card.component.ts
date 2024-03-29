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
    this.principalImageSummon = 'https://i.imgur.com/sBJ37dU.png';
    this.principalImageSpell = 'https://i.imgur.com/BmpjQMV.jpg';
  }

  // seteo la lista de summon por versión de juego
  public getSummonsList(game: string): void {
    this.magicService
      .getSummonsList()
      .pipe(map((summons) => summons.filter((summon) => summon.game === game)))
      .subscribe((summonsList: SummonsDTO[]) => {
        this.summonsList$ = of(summonsList);
      });
  }

  // seteo la lista de spell por versión de juego
  public getSpellsList(game: string): void {
    this.magicService
      .getSpellsList()
      .pipe(map((spells) => spells.filter((spell) => spell.game === game)))
      .subscribe((spellsList: SpellsDTO[]) => {
        this.spellsList$ = of(spellsList);
      });
  }

  // cambio de lista basado en tipo de magia
  onSelectedMagic() {
    if (this.selectedMagic === 'spells') {
      this.getSpellsList(this.selectedGame);
    } else if (this.selectedMagic === 'summons') {
      this.getSummonsList(this.selectedGame);
    }
  }

  // cambio de lista e imagen basado en versión
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
        this.principalImageSummon = 'https://i.imgur.com/B8CR9hA.png';
        break;
      }
      case 'XV': {
        this.principalImageSummon = 'https://i.imgur.com/j4tm3Pm.png';
        break;
      }
      default: {
        this.principalImageSummon = 'https://i.imgur.com/sBJ37dU.png';
        break;
      }
    }
  }
  showMainImageSpell(game: string) {
    switch (game) {
      case 'X': {
        this.principalImageSpell = 'https://i.imgur.com/SwXGlH8.png';
        break;
      }
      case 'XV': {
        this.principalImageSpell = 'https://i.imgur.com/PrL7sjQ.jpg';
        break;
      }
      default: {
        this.principalImageSpell = 'https://i.imgur.com/BmpjQMV.jpg';
        break;
      }
    }
  }
}
