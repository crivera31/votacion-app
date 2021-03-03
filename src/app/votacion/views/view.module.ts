import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ViewModule { }
