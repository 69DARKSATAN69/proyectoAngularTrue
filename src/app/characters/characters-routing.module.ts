import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { IndividualComponent } from './individual/individual.component';

const routes: Routes = [
	{ 
		path: '', 
		component: CharactersComponent 
	}, 
	{
		path: 'individual', 
		component: IndividualComponent
	},
	{
		path: "individual/:characterId",
		component:  IndividualComponent
	},
	{ 
		path: 'private', 
		loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) 
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
