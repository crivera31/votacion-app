import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    PipesModule
  ]
})
export class PagesModule { }
