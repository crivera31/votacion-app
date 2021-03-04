import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { VotacionService } from '../service/votacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public lstData: any;

  votarForm = new FormGroup({
    voto: new FormControl('')
  });
  constructor(private votacionService: VotacionService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.votacionService.listarCandidatoPartido().subscribe(
      res => {
        this.lstData = res;
      }
    )
  }
  toggleVisibility(e){
    if ( e.target.checked ) {
      console.log('true')
 }
  }

  onVotar() {
    // console.log(this.votarForm.value)
    const { voto } = this.votarForm.value;
    if(voto === "") {
      return Swal.fire('Error','Seleccione su candidato.','error');
    }
    Swal.fire({
      title: '¿Confirmar su voto?',
      confirmButtonText: `Si`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Éxito!', 'Su voto ha sido realizado.', 'success');
      }
    })
  }

}
