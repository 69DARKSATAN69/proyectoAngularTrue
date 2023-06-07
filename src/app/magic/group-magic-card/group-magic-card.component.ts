import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SummonsDTO } from '../magicDTO/summonsDTO';
import { MagicService } from '../services/magic.service';

@Component({
  selector: 'app-group-magic-card',
  templateUrl: './group-magic-card.component.html',
  styleUrls: ['./group-magic-card.component.css'],
})
export class GroupMagicCardComponent {
  summonsList$: Observable<SummonsDTO[]>;
  constructor(private fetcher: MagicService) {
    this.summonsList$ = new Observable<SummonsDTO[]>();
  }
  public getList(): void {
    this.summonsList$ = this.fetcher
      .getSummonsList()
      .pipe(map((summon) => summon.filter((summon) => summon.game === 'VII')));
  }
  ngOnInit() {
    this.getList();
  }
}
