import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotacionRoutingModule } from './votacion/votacion-routing.module';
import { ViewRoutingModule } from './votacion/views/view-routing.module';


const routes: Routes = [
  { path: '', redirectTo: '/votacion-online', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    VotacionRoutingModule,
    ViewRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
