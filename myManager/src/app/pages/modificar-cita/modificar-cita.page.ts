import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { UsuariosService } from 'src/app/services/usuarios.service';

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
    
   (document.getElementById("nombreCita") as HTMLInputElement).value = cita.nombreCliente;
   (document.getElementById("precioCita") as HTMLInputElement).value = cita.presupuesto+"";
  }

  modificar(){
    
  }
}
