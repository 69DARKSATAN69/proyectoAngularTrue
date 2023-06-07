import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonstersRoutingModule } from './monsters-routing.module';
import { MonstersComponent } from './monsters.component';
import { HttpClientModule } from '@angular/common/http';
import { MonsterServiceService } from './services/monster-service.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    MonstersComponent
  ],
  imports: [
    CommonModule,
    MonstersRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule
  ],
  providers: [
    MonsterServiceService
  ]
})
export class MonstersModule { }
