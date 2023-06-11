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
  ],
  exports: [MagicListComponent, PostEditDeleteComponent],
})
export class PrivateModule {}
