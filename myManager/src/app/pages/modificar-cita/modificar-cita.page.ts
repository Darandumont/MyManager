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
    let citaActiva = UsuariosService.getCitaByFecha(UsuariosService.fechaCitaActiva);   

    (document.getElementById("nombreCita") as HTMLInputElement).value = citaActiva.nombreCliente;
  }

  modificar(){
    
  }
}
