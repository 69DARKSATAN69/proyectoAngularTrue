import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonstersComponent } from './monsters.component';
import { OneMonsterComponent } from './one-monster/one-monster.component';

const routes: Routes = [{ path: '', component: MonstersComponent }, 
{ path: 'private', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule), data: {requiresAuth: true} }, 
{path: ':id', component: OneMonsterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonstersRoutingModule { }
