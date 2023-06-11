import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CharacterInterceptorInterceptor } from './interceptors/character-interceptor.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CharacterServiceService } from '../services/character-service.service';
import {MatRadioModule} from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PrivateComponent,
    CharacterFormComponent,
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
	MatPaginatorModule,
	MatTableModule,
	ReactiveFormsModule,
	MatInputModule,
	MatFormFieldModule,
	MatCardModule,
	MatRadioModule,
	MatButtonModule
  ],
  providers:[
	CharacterServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CharacterInterceptorInterceptor,
      multi: true
    }
  ]
})
export class PrivateModule { }
