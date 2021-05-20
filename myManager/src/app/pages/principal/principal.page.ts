import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
//import { loadavg } from 'node:os';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Cita } from 'src/app/models/citas.modelo';
import { CitaID } from 'src/app/models/citasID.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  listaCitas: Cita[];
  fecha: Date;

  constructor(
    public router: Router,
    public firestore: FirestoreService) { }

  //TO DO
  ngOnInit() {
    //evt: JQuery.Event valor a pasar por parametro en caso de error

    $('#lista_citas').on('click', 'ion-item', (evt: Event) => {
      this.modificarCita(evt);
    });

    //Guardamos el usuario con el que han logueado. Seria usuario logueado por GOOGLE
    UsuariosService.usuario = new Usuario(UsuariosService.usuarioAutorizacion.email, "");
  }

  ionViewWillEnter() {
    this.recargarPagina();
  }

  recargarPagina() {
    let dia = UsuariosService.fechaCitaActiva;

    let fecha = new Date(dia);
    $("#dia").text(fecha.toDateString());

     this.firestore.getCitas3();
     this.cargarCitas(UsuariosService.listaCitasID);
     console.log("LA LISTA", UsuariosService.listaCitasID);

    // this.firestore.getCitas2().subscribe(listaCitas => {
    //   console.log("Imprimiendo", listaCitas.length);
    //   this.cargarCitas(listaCitas as Cita[]);
    // })
  }

  //Metodo que accede a la ventana de crear cita
  crearCita(evt: Event) {
    this.router.navigate(['crear-cita']);
  }

  cargarCitas(listaCitas: Cita[]) {
    let dia = UsuariosService.fechaCitaActiva;
    this.fecha = new Date(dia);
    let fechaFinalHoy = this.fecha.getFullYear() + " " + (this.fecha.getMonth() + 1) + " " + this.fecha.getDate();
    let bloque = $("#lista_citas");

    //Comprobamos que el bloque este vacio antes de emepzar la impresion de citas.
    bloque.empty();   
    

    for (const cita of listaCitas) {
      let fechaCita = new Date(cita.fecha);
      let fechaFinalCita = fechaCita.getFullYear() + " " + (fechaCita.getMonth() + 1) + " " + fechaCita.getDate();
      
      if (fechaFinalHoy === fechaFinalCita) {
        let elemento = $('<ion-item/>', {
          'html': `${cita.nombreCliente}  ${cita.presupuesto}  ${cita.fecha}`,//Revisar fecha
          'id': cita.fecha,
          'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss
        }
        );
        UsuariosService.usuario.listaCitas.push(cita);
        bloque.append(elemento);
      }
    }

  }

  modificarCita(evt: Event) {

    let elemento = (evt.target) as HTMLIonItemElement;
    UsuariosService.fechaCitaActiva = elemento.id;

    UsuariosService.cita = UsuariosService.usuario.listaCitas.find(cita => cita.fecha == elemento.id);

    this.router.navigate(['modificar-cita']);
  }
}




