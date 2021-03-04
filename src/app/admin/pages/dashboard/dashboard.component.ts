import { Component, OnInit } from '@angular/core';
import { VotacionService } from 'src/app/votacion/service/votacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lstData: any;
  
  constructor(private votacionService: VotacionService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.votacionService.listarCandidatoPartido().subscribe(
      res => {
        console.log(res)
        this.lstData = res;
      }
    )
  }

}
