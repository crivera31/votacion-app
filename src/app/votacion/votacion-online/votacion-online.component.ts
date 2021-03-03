import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { VotacionService } from '../service/votacion.service';

@Component({
  selector: 'app-votacion-online',
  templateUrl: './votacion-online.component.html',
  styleUrls: ['./votacion-online.component.css']
})
export class VotacionOnlineComponent implements OnInit {
  public dni = new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  constructor(private router: Router, private votacionService: VotacionService) {
  }

  ngOnInit(): void {
  }

  onlyNumberKey(event) {
    // return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    return (event.charCode >= 48 && event.charCode <= 57) ? true : false;
  }

  onVotar() {
    const dni = this.dni.value;
    if(dni.length === 0) {
      console.log('Ingrese su dni');
    } else {
      console.log('mi dni: ',dni);
      this.votacionService.getVotante(dni).subscribe(
        res => {
          console.log(res)
          if(res.voto == 1) {
            return  Swal.fire('Error',res.nombre + ' usted ya realizo su voto.','error');
          } else {
            this.router.navigateByUrl('/home');
            alert('Bienvenido '+res.nombre)
          }
        }
      );
    }
  }

}
