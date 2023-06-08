import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagicRoutingModule } from './magic-routing.module';
import { MagicPipe } from './pipe/magic.pipe';
import { MagicDirective } from './directives/magic.directive';
import { IndividualMagicCardComponent } from './individual-magic-card/individual-magic-card.component';
import { GroupMagicCardComponent } from './group-magic-card/group-magic-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MagicPipe,
    MagicDirective,
    IndividualMagicCardComponent,
    GroupMagicCardComponent,
  ],

  imports: [CommonModule, MagicRoutingModule, MatGridListModule, MatCardModule],
  exports: [IndividualMagicCardComponent],
})
export class MagicModule {}
