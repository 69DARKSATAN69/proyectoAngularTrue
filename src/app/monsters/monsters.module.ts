import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonstersRoutingModule } from './monsters-routing.module';
import { MonstersComponent } from './monsters.component';


@NgModule({
  declarations: [
    MonstersComponent
  ],
  imports: [
    CommonModule,
    MonstersRoutingModule
  ]
})
export class MonstersModule { }
