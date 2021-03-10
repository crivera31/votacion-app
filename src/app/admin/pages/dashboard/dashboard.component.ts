import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VotacionService } from '../../../service/votacion.service';

import * as XLSX from 'xlsx';
import * as fileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public lstTodo: any;
  public lstData: any;
  public lstTres: any;
  // public lstPartidos: any;
  public fileURL: any;
  public lstVotantes: any;
  public lstPartidoCandidato: any;
  public total_votantes: any;
  public total_per_vot: any;
  public total_per_no_vot: any;

  public ganador: any;
  public nombre_ganador: any;
  public votos_ganador: any;
  
  constructor(private votacionService: VotacionService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
    if(localStorage.getItem('token') === null) {
      this.votacionService.logout();
      this.router.navigateByUrl('/login-admin');
    }
  }

  listar() {
    this.votacionService.listarVoto_x_Candidato().subscribe(
      res => {
        this.lstTodo = this.obtenerGanador(...res.candidatos_conteo);
        // console.log(res);
        this.lstPartidoCandidato = res.resultado_votos;
        this.total_votantes = res.total_votantes;
        this.total_per_vot = res.personas_votaron;
        this.total_per_no_vot = res.personas_que_no_votaron;
        let cont = 1;
        this.lstVotantes = res.votantes.filter(elemento => elemento.libele !== null).map(e => {
          if (e.voto == 1) {
            e.voto = 'Si'
          } else {
            e.voto = 'No'
          }
          return {
            id: cont++,
            nombre: e.nombre,
            dni: e.libele,
            voto: e.voto
          }
        }); 
        this.lstTres = res.candidatos_conteo.sort((a,b)=> b.votantes_count - a.votantes_count).slice(0, 3);
        this.lstData = res.candidatos_conteo.sort((a,b)=> a.id - b.id);
      }
    )
  }

  @ViewChild('tablaTotal') tablaTotal: ElementRef;
  ExportToExcel() {
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tablaTotal.nativeElement, { dateNF: "dd/mm/yyyy" });

    let wb: XLSX.WorkBook = { Sheets: { 'Total de votos': ws }, SheetNames: ['Total de votos'] };

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, "votos");
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  // exportarVotantes
  exportarVotantes():void {
    this.exportAsExcelFile(this.lstVotantes, 'relacion_votantes');
 }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.save(excelBuffer, excelFileName);
  }
  private save(buffer: any, fileName: string): void {
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
     fileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  obtenerGanador(...data) {
    this.ganador = data.sort((a,b)=> b.votantes_count - a.votantes_count).slice(0, 1);
    this.nombre_ganador = this.ganador[0].nombre;
    this.votos_ganador = this.ganador[0].votantes_count;
    return {
      ganador: this.nombre_ganador,
      votos: this.votos_ganador
    }
  }
  @ViewChild('pdfTable') pdfTable: ElementRef;

  public downloadPDF() {
    // console.log(this.lstTodo);
    // const pdf = new jsPDF('p','pt', 'a4');
    // //get table html
    // const pdfTable = this.pdfTable.nativeElement;
    // //html to pdf format
    // var html = htmlToPdfmake(pdfTable.innerHTML);
   
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    window.location.href = environment.base_url + '/descargarPdf';
  }

  public exportarTodo() {
    window.location.href = environment.base_url + '/descargarExcel';
  }

  formato(dato1: any, dato2: any) {
    const valor = ((dato1 / dato2) * 100).toFixed(2);
    return valor;
  }
  onLogout() {
    this.votacionService.logout_admin();
    this.router.navigateByUrl('/login-admin')
  }

}
