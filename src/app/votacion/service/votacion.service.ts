import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap,map, catchError, delay } from 'rxjs/operators';
import { Votante } from 'src/app/model/votante';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  private cabezera = new HttpHeaders({ "content-Type": "application/json" });
  public votante: Votante;

  constructor(private http: HttpClient, private router: Router) { }

  listarCandidatoPartido() {
    return this.http.get<any>(`${base_url}/partidos`);
  }

  guardarDatos(data: any) {
    localStorage.setItem('id',data.id);
    localStorage.setItem('nombre',data.nombre);
    localStorage.setItem('valor',data.voto);
  }

  getVotante(dni: string) {
    return this.http.get<any>(`${base_url}/votantesvalidar/${dni}`).pipe(
      tap( res => {
        this.guardarDatos(res);
      })
    );
  }
  guardarVoto(data: {votante_id: any, candidato_id: any}) {
    return this.http.post<any>(`${base_url}/votantesvoto`, data,{  headers: this.cabezera });
  }
  logout() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('id');
    localStorage.removeItem('valor');
  }
}
