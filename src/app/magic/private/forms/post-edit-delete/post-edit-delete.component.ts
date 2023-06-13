import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SpellsDTO } from 'src/app/magic/magicDTO/spellsDTO';
import { SummonsDTO } from 'src/app/magic/magicDTO/summonsDTO';
import { MagicService } from 'src/app/magic/services/magic.service';
import {
  DataMessage,
  NotificationComponent,
} from 'src/app/pages/notification/notification.component';

@Component({
  selector: 'app-post-edit-delete',
  templateUrl: './post-edit-delete.component.html',
  styleUrls: ['./post-edit-delete.component.css'],
})
export class PostEditDeleteComponent {
  public magicForm: FormGroup;
  public id: string | null;

  @Input() magicToEdit: SummonsDTO | SpellsDTO;
  @Input() type: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private service: MagicService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.magicForm = this.formBuilder.group({});

    this.magicToEdit = new SummonsDTO();
    this.id = null;
    this.type = null;
  }

  private commonFieldsMagic = {};
  private summonFields = {};
  private spellFields = {};

  private initFields() {
    // evita repetir los mismo campos
    this.commonFieldsMagic = {
      id: { value: '', disabled: true },
      name: ['', [Validators.required]],
      game: ['', [Validators.required]],
      image: ['', [Validators.required]],
      MP: ['', [Validators.required]],
      level: ['', [Validators.required]],
      effect: [''],
      resume: ['', [Validators.required]],
    };
    this.summonFields = {
      ...this.commonFieldsMagic,
      location: [''],
      'magic-materia': ['', [Validators.required]],
      element: ['', [Validators.required]],
      Attack: ['', [Validators.required]],
      Attributes: ['', [Validators.required]],
      info: ['', [Validators.required]],
    };
    this.spellFields = {
      ...this.commonFieldsMagic,
      type: [''],
      required: ['', [Validators.required]],
      power: ['', [Validators.required]],
      use: ['', [Validators.required]],
    };
  }

  private createSummonForm() {
    this.magicForm = this.formBuilder.group(this.summonFields);
  }
  private createSpellForm() {
    this.magicForm = this.formBuilder.group(this.spellFields);
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.id = params.get('id');
      this.type = params.get('type');

      if (this.id) {
        // en modo edición se setean los campos con los valores de la bbdd
        const magicObserve: any =
          this.type === 'summon'
            ? this.service.getSummonById(Number(this.id))
            : this.service.getSpellById(Number(this.id));
        magicObserve.subscribe({
          next: (magicData: any) => {
            this.magicForm.setValue(magicData);
          },
        });
      }
      this.initFields();
      this.type === 'summon' ? this.createSummonForm() : this.createSpellForm();
    });
  }

  public showNotification(data: DataMessage) {
    this._snackBar.openFromComponent(NotificationComponent, {
      data,
      duration: 2000,
      panelClass: data.type,
    });
  }
  createMagic() {
    if (this.magicForm.invalid)
      return this.showNotification({
        message: 'You need to fill out the form correctly',
        type: 'error',
      });
    let magicObserve: any;
    if (!this.id) {
      // formulario en modo creación de magic
      magicObserve =
        this.type === 'spell'
          ? this.service.createSpell(this.magicForm.value)
          : this.service.createSummon(this.magicForm.value);
    } else {
      // formulario en modo edición de magic
      magicObserve =
        this.type === 'spell' //el query param es tipo string
          ? this.service.editSpell(Number(this.id), this.magicForm.value)
          : this.service.editSummon(Number(this.id), this.magicForm.value);
    }
    magicObserve.subscribe({
      next: () => {
        this.showNotification({
          message: `${this.type} create successfully!`,
          type: 'success',
        }),
          this.magicForm.reset();
      },
      error: () =>
        this.showNotification({ message: 'An errors ocurred', type: 'error' }),
    });
  }
}
