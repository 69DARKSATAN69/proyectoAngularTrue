import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagicRoutingModule } from './magic-routing.module';
import { MagicPipe } from './pipe/magic.pipe';
import { MagicDirective } from './directives/magic.directive';
import { IndividualMagicCardComponent } from './individual-magic-card/individual-magic-card.component';


@NgModule({
  declarations: [
    MagicPipe,
    MagicDirective,
    IndividualMagicCardComponent
  ],
  imports: [
    CommonModule,
    MagicRoutingModule
  ],
  exports: [
    IndividualMagicCardComponent
  ]
})
export class MagicModule { }
