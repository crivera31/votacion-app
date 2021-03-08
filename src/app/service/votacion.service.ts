import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap,map, catchError, delay } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VotacionService {
  private cabezera = new HttpHeaders({ "content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) { }

  listarCandidatoPartido() {
    return this.http.get<any>(`${base_url}/partidos`);
  }
  listarVoto_x_Candidato() {
    return this.http.get<any>(`${base_url}/votantesresultado`);
  }

  guardarDatos(data: any) {
    localStorage.setItem('id',data.id);
    localStorage.setItem('nombre',data.nombre);
    localStorage.setItem('valor',data.voto);
  }
  guardarToken(token: any) {
    localStorage.setItem('token',token);
  }

  getVotante(dni: string) {
    return this.http.get<any>(`${base_url}/votantesvalidar/${dni}`).pipe(
      tap( res => {
        console.log(res)
        if(res.voto == 0) {
          this.guardarDatos(res);
        }
      })
    );
  }
  guardarVoto(data: {votante_id: any, candidato_id: any}) {
    return this.http.post<any>(`${base_url}/votantesvoto`, data,{  headers: this.cabezera });
  }

  login(data: {username: any, password: any}) {
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let params = new URLSearchParams();
    params.set('username', data.username);
    params.set('password', data.password);
    return this.http.post<any>(`${base_url}/login`, params.toString(),{  headers: httpHeaders }).pipe(
      tap( res => {
        this.guardarToken(res.api_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('nombre');
    localStorage.removeItem('id');
    localStorage.removeItem('valor');
  }
  logout_admin() {
    localStorage.removeItem('token');
  }
}
