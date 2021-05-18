import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.page.html',
  styleUrls: ['./modificar-cita.page.scss'],
})
export class ModificarCitaPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(UsuariosService.fechaCitaActiva);
    let cita = UsuariosService.cita;
    
    $('#nombreCita').val(cita.nombreCliente);
    $('#precioCita').val(cita.presupuesto);
    let dia = new Date(cita.fecha);
    let mes = dia.getMonth() < 10? `0${dia.getMonth()}`: dia.getMonth() ;
    $('#diaCita').val(`${dia.getFullYear()}-${mes as number}-${dia.getDate()}`);
    
  //  (document.getElementById("nombreCita") as HTMLInputElement).value = cita.nombreCliente;
  //  (document.getElementById("precioCita") as HTMLInputElement).value = cita.presupuesto+"";
  
  }

  modificar(){
    
  }
}
