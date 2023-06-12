import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MagicListComponent } from '../private/forms/magic-list/magic-list.component';
import { PostEditDeleteComponent } from './forms/post-edit-delete/post-edit-delete.component';

const routes: Routes = [
  { path: '', component: MagicListComponent },
  { path: 'addMagic', component: PostEditDeleteComponent },
  { path: 'editMagic', component: PostEditDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
