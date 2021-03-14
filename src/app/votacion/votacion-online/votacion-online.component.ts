import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { VotacionService } from '../../service/votacion.service';

@Component({
  selector: 'app-votacion-online',
  templateUrl: './votacion-online.component.html',
  styleUrls: ['./votacion-online.component.css']
})
export class VotacionOnlineComponent implements OnInit {
  public dni = new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  public listadoCargos = [];
  public login = {
    dni: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    cargo_id: new FormControl('',[Validators.required])
  };
  constructor(private router: Router, private votacionService: VotacionService) {
  }

  ngOnInit(): void {
    console.log(this.login.dni.value);
    if(localStorage.getItem('nombre') !== null) {
      this.router.navigateByUrl('/home');
    }

    this.listarCargos();
  }

  onlyNumberKey(event) {
    // return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    return (event.charCode >= 48 && event.charCode <= 57) ? true : false;
  }

  onVotar() {
    let dataEnviada = {
      dni: this.login.dni.value,
      cargo_id: this.login.cargo_id.value
    };
    console.log(dataEnviada);
    //return ;
  
    
    if(!dataEnviada.cargo_id && !dataEnviada.dni){
      return  Swal.fire('Error','Seleccione su Cargo y DNI.','error');
    }else
    if(!dataEnviada.dni && dataEnviada.cargo_id) {
      return  Swal.fire('Error','Digite su DNI.','error');
    }else
    if(!dataEnviada.cargo_id && dataEnviada.dni){
      return  Swal.fire('Error','Elija su cargo.','error');
    }
    else {
      this.votacionService.getVotante(dataEnviada).subscribe(
        (res: any) => {
          console.log(res);
          if(res.validado){
            if(res.voto == 1) {
              return  Swal.fire('Aviso',res.nombre + ' usted ya realizo su voto.','info');
            } else {
              this.router.navigateByUrl('/home');
              Swal.fire('Bienvenido(a)',res.nombre,'success');
            }
          }else{
            return  Swal.fire('Aviso',res.msg,'info');
          }
        },
        (err) => {
          // console.log(err);
          if(!err.validado) {
            return  Swal.fire('Aviso','No se encontro un usuario con el DNI.','info');
          }
        }
      );
    }
  }

  listarCargos(){
    this.votacionService.getCargos().subscribe(res=>{

      this.listadoCargos = res.data;
      console.log(res);
    });
  }

}
