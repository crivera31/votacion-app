import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VotacionService {

  constructor(private http: HttpClient, private router: Router) { }

  listarCandidatoPartido() {
    return this.http.get<any>("assets/partido-candidato.json");
  }

  getVotante(dni: string) {
    return this.http.get<any>("assets/votante.json").pipe(
      map(res => res.find(dato => dato.dni === dni))
    );
  }
}
