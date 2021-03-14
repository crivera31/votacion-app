import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PorcentajesPipe } from './porcentajes.pipe';



@NgModule({
  declarations: [PorcentajesPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    PorcentajesPipe
  ]
})
export class PipesModule { }
