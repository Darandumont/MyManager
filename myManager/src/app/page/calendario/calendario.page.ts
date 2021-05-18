import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  calendario: HTMLInputElement;

  constructor(
    public router: Router,
    public platform: Platform,
    public calendar: Calendar) { }

  ngOnInit() {
    this.calendario = document.getElementById("calendario") as HTMLInputElement;
    let dia = new Date();
    let mes = dia.getMonth() < 10? `0${dia.getMonth()+1}`: dia.getMonth()+1 ;
    
    $('#calendario').val(`${dia.getFullYear()}-${mes as number}-${dia.getDate()}`);
    
    this.calendar.createCalendar('MyCalendar').then(
      (msg) => { console.log("Correcto",msg); },
      (err) => { console.log("Incorrecto",err); }
    );
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
