import { NgModule } from '@angular/core';

import { VotacionOnlineComponent } from './votacion-online/votacion-online.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { VotacionComponent } from './votacion.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [VotacionOnlineComponent, VotacionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class VotacionModule { }
