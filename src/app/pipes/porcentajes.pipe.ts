import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'porcentajes'
})
export class PorcentajesPipe implements PipeTransform {


  transform(value: number, total: number): number {
    let porcentaje: number;
    if(value && value != 0){
      porcentaje = Math.round((value/total)*100);
      return porcentaje;
    }else{
      return 0;
    }
    
  }

}
