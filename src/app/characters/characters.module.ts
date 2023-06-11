import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { IndividualComponent } from './individual/individual.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CharacterServiceService } from './services/character-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { AlignmentDirective } from './directives/alignment.directive';
import { ToInchesPipe } from './pipes/to-inches.pipe';



@NgModule({
  declarations: [
    CharactersComponent,
    IndividualComponent,
    AlignmentDirective,
    ToInchesPipe
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
	MatGridListModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	HttpClientModule,
	MatTableModule,
	MatButtonModule
  ],
  providers: [
	CharacterServiceService
  ]
})
export class CharactersModule { }
