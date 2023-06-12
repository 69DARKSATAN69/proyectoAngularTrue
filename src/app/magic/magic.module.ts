import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagicRoutingModule } from './magic-routing.module';
import { MagicPipe } from './pipe/magic.pipe';
import { MagicDirective } from './directives/magic.directive';
import { IndividualMagicCardComponent } from './individual-magic-card/individual-magic-card.component';
import { GroupMagicCardComponent } from './group-magic-card/group-magic-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { TranslateDirective } from './directives/translate.directive';

@NgModule({
  declarations: [
    MagicPipe,
    MagicDirective,
    TranslateDirective,
    IndividualMagicCardComponent,
    GroupMagicCardComponent,
  ],

  imports: [
    CommonModule,
    MagicRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
  ],
  exports: [IndividualMagicCardComponent],
})
export class MagicModule {}
