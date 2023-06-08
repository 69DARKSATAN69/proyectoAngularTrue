import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';


@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatTableModule
  ]
})
export class PrivateModule { }
