import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-modificar-cita',
  templateUrl: './modificar-cita.page.html',
  styleUrls: ['./modificar-cita.page.scss'],
})
export class ModificarCitaPage implements OnInit {
  cita: Cita;
  constructor(public componenteIonicService: ComponentesIonicService,
    public router: Router,
    public firestore: FirestoreService) { }

  ngOnInit() {
    console.log(UsuariosService.fechaCitaActiva);
    let cita = UsuariosService.cita;
    
    $('#nombreCita').val(cita.nombreCliente);
    $('#precioCita').val(cita.presupuesto);   
  
  }

  modificar() {
    this.cita.nombreCliente = (document.getElementById("nombreCita") as HTMLInputElement).value;
    this.cita.presupuesto = ((document.getElementById("precioCita") as HTMLInputElement).value as any) as number;
    console.log("Objetto modificado");

    let idCita :string = (this.cita.fecha as any)as string;
    this.firestore.updateCita(idCita,this.cita);
    UsuariosService.cita = this.cita;
    this.router.navigate(['principal']);
  }
}
