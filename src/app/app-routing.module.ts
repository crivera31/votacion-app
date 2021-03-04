import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotacionRoutingModule } from './votacion/votacion-routing.module';
import { ViewRoutingModule } from './votacion/views/view-routing.module';

import { AdminRoutingModule } from './admin/admin-routing.module';
import { PagesRoutingModule } from './admin/pages/pages-routing.module';


const routes: Routes = [
  { path: '', redirectTo: '/votacion-online', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    VotacionRoutingModule,
    ViewRoutingModule,
    AdminRoutingModule,
    PagesRoutingModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
