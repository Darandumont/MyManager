import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  calendario: HTMLInputElement;

  constructor(public router: Router) { }

  ngOnInit() {
    this.calendario = document.getElementById("calendario") as HTMLInputElement;
    let dia = new Date();
    let mes = dia.getMonth() < 10? `0${dia.getMonth()+1}`: dia.getMonth()+1 ;
    
    $('#calendario').val(`${dia.getFullYear()}-${mes as number}-${dia.getDate()}`);
  }

  abrir() {
    let calendario = document.getElementById("calendario") as HTMLInputElement;
    console.log(calendario.value);
    let fecha = new Date(calendario.value);
    UsuariosService.fechaCitaActiva = fecha.toString();
    this.router.navigate(["principal"]);


    //UsuariosService.fechaCitaActiva = (calendario.value) as Date;

  }

}
