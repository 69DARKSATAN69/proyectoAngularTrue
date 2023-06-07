import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagicListComponent } from './forms/magic-list/magic-list.component';
import { PostEditDeleteComponent } from './forms/post-edit-delete/post-edit-delete.component';



@NgModule({
  declarations: [
    MagicListComponent,
    PostEditDeleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MagicListComponent,
    PostEditDeleteComponent
  ]
})
export class PrivateModule { }
