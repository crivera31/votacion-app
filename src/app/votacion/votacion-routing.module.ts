import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotacionOnlineComponent } from './votacion-online/votacion-online.component';

const routes: Routes = [
  { path: 'votacion-online', component: VotacionOnlineComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VotacionRoutingModule { }
