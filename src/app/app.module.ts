import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    NotFoundComponent,
    AboutUsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
	LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }