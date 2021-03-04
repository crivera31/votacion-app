import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule
  ]
})
export class PagesModule { }
