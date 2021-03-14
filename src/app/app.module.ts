import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { VotacionModule } from './votacion/votacion.module';
import { ViewModule } from './votacion/views/view.module';

import { AdminModule } from './admin/admin.module';
import { PagesModule } from './admin/pages/pages.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    VotacionModule,
    ViewModule,
    AdminModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
