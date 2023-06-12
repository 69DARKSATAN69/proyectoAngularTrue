import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SpellsDTO } from 'src/app/magic/magicDTO/spellsDTO';
import { SummonsDTO } from 'src/app/magic/magicDTO/summonsDTO';
import { MagicService } from 'src/app/magic/services/magic.service';
import { DialogComponent } from 'src/app/pages/dialog/dialog.component';
import { NotificationComponent } from 'src/app/pages/notification/notification.component';

@Component({
  selector: 'app-magic-list',
  templateUrl: './magic-list.component.html',
  styleUrls: ['./magic-list.component.css'],
})
export class MagicListComponent {
  public magicList$: Observable<any>;
  public magicSelected: string = 'summon';

  constructor(
    private magicService: MagicService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: Router
  ) {
    this.magicList$ = new Observable<SummonsDTO[] | SpellsDTO[]>();
  }

  getAllSummons() {
    this.magicService.getSummonsList().subscribe((data) => {
      this.magicList$ = of(data);
    });
  }
  getAllSpells() {
    this.magicService.getSpellsList().subscribe((data) => {
      this.magicList$ = of(data);
    });
  }

  ngOnInit() {
    this.getAllSummons();
  }

  editMagic(id: number) {
    this.route.navigate(['magic/private/editMagic'], {
      queryParams: { type: this.magicSelected, id: id },
    });
  }

  deleteMagic(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: 'Are you sure?',
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        const subscribeFunction = {
          next: () => {
            this._snackBar.openFromComponent(NotificationComponent, {
              data: {
                message: 'Magic deleted successfully',
                type: 'success',
              },
              duration: 2000,
              panelClass: 'success',
            });
            this.magicSelected === 'summon'
              ? this.getAllSummons()
              : this.getAllSpells();
          },
          error: () => {},
        };
        this.magicSelected === 'summon'
          ? this.magicService.deleteSummon(id).subscribe(subscribeFunction)
          : this.magicService.deleteSpell(id).subscribe(subscribeFunction);
      }
    });
  }

  onSelectedMagic() {
    if (this.magicSelected === 'spell') {
      this.getAllSpells();
    } else if (this.magicSelected === 'summon') {
      this.getAllSummons();
    }
  }

  public displayedColumns = ['id', 'game', 'name', 'options'];
}
