import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Votante } from 'src/app/model/votante';
import Swal from 'sweetalert2';
import { VotacionService } from '../service/votacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public lstData: any;
  public isVoto: boolean;

  votarForm = new FormGroup({
    voto: new FormControl('')
  });
  constructor(private votacionService: VotacionService, private router: Router) {
    this.isVoto = false;
  }

  ngOnInit(): void {
    console.log(this.isVoto);
    this.listar();
    if(localStorage.getItem('nombre') === null || localStorage.getItem('id') == null) {
      this.votacionService.logout();
      this.router.navigateByUrl('/votacion-online');
    }
  }

  listar() {
    this.votacionService.listarCandidatoPartido().subscribe(
      res => {
        // console.log(res.data);
        this.lstData = res.data;
      }
    )
  }

  onVotar() {
    const { voto } = this.votarForm.value;
    // console.log('id candidato => ' +voto);
    // console.log('id Votante => ' +localStorage.getItem('id'));
  
    if(localStorage.getItem('valor') === "1") {
      return Swal.fire('Aviso','Ya realizó su voto.','info');
    }
    if(voto === "") {
      return Swal.fire('Aviso','Seleccione su candidato.','info');
    }

    Swal.fire({
      title: '¿Desea Confirmar su voto?',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        const data= {
          votante_id: localStorage.getItem('id'),
          candidato_id: voto
        }

        localStorage.setItem('valor','1');
        this.isVoto = true;
        this.votacionService.guardarVoto(data).subscribe(
          res => {
            console.log(res)
            Swal.fire('Éxito!', 'Su voto ha sido realizado exitosamente.', 'success');

          }
        )
      }
    })
  }

  onLogout() {
    this.votacionService.logout();
    this.router.navigateByUrl('/votacion-online')
  }

}
