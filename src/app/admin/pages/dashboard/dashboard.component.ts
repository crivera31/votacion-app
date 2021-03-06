import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotacionService } from 'src/app/service/votacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lstData: any;
  
  constructor(private votacionService: VotacionService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.votacionService.listarCandidatoPartido().subscribe(
      res => {
        console.log(res)
        this.lstData = res.data;
      }
    )
  }

  onLogout() {
    this.votacionService.logout_admin();
    this.router.navigateByUrl('/login-admin')
  }

}
