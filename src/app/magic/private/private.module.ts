import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicListComponent } from './forms/magic-list/magic-list.component';
import { PostEditDeleteComponent } from './forms/post-edit-delete/post-edit-delete.component';
import { MatTableModule } from '@angular/material/table';
import { PrivateRoutingModule } from './private-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MagicService } from '../services/magic.service';
import { MagicInterceptor } from './interceptors/magic.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MagicListComponent, PostEditDeleteComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PrivateRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
  ],
  exports: [MagicListComponent, PostEditDeleteComponent],
  providers: [
    MagicService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MagicInterceptor,
      multi: true,
    },
  ],
})
export class PrivateModule {}
