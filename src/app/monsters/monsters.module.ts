import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonstersRoutingModule } from './monsters-routing.module';
import { MonstersComponent } from './monsters.component';
import { HttpClientModule } from '@angular/common/http';
import { MonsterServiceService } from './services/monster-service.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MonstersComponent
  ],
  imports: [
    CommonModule,
    MonstersRoutingModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
    
  ],
  providers: [
    MonsterServiceService
  ]
})
export class MonstersModule { }
