import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
	{ 
		path: '', 
		component: HomeComponent 
	},
	{ 
		path: 'login', 
		component: HomeComponent 
	},
	{ 
		path: 'auth', 
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
	},
	{ 
		path: 'about-us', 
		component: AboutUsComponent
	},
	{ 
		path: 'contact', 
		component: ContactComponent 
	},
	{ 
		path: '**', 
		component: NotFoundComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
