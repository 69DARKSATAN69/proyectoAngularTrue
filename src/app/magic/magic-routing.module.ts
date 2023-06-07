import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupMagicCardComponent } from './group-magic-card/group-magic-card.component';

const routes: Routes = [{ path: '', component: GroupMagicCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MagicRoutingModule {}
