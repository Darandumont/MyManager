import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuario: Usuario;
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

<<<<<<< HEAD
    //Guardamos el usuario con el que han logueado. Seria usuario logueado por GOOGLE
=======
    //Esto tiene que ir en el home.
>>>>>>> a4bf402e9710b9015d1ef8f44fb3ca9b1d3bfd27
    this.usuario = new Usuario(UsuariosService.usuarioAutorizacion.email, "");
    UsuariosService.usuario = this.usuario;
  }

  ionViewWillEnter() {
    this.recargarPagina();
  }

  // traerCitas(): void {
  //   this.firestore.getCitas2().subscribe(listaCitas => {
  //     console.log("Imprimiendo",listaCitas as Cita[])
  //     this.cargarCitas(listaCitas as Cita[]);
  //   })
  // }

  recargarPagina() {
    // this.traerCitas();
    let dia = UsuariosService.fechaCitaActiva;
    this.fecha = new Date(dia);
    $("#dia").text(this.fecha.toDateString());
    //(document.getElementById("dia") as HTMLInputElement).textContent = dia.toDateString();    
    //this.cargarCita2();
    this.firestore.getCitas3();

    this.firestore.getCitas2().subscribe(listaCitas => {
      console.log("Imprimiendo", listaCitas.length);
      this.cargarCitas(listaCitas as Cita[]);
    })
  }

  //Metodo que accede a la ventana de crear cita
  crearCita(evt: Event) {
    this.router.navigate(['crear-cita']);
  }

  // cargarCita(usuario: Usuario) {
  //   let bloque = $("#lista_citas");

  //   for (const cita of usuario.listaCitas) {

  //     let elemento = $('<ion-item/>', {
  //       'html': cita.toString(),
  //       'id': cita.fecha,
  //       'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss

  //     });
  //     bloque.append(elemento);
  //   }
  // }

  // cargarCita2() {

  //   //var bloque = (document.getElementById("lista_citas") as HTMLIonListElement);
  //   let bloque = $("#lista_citas");

  //   for (const cita of this.listaCitas) {

  //     let elemento = $('<ion-item/>', {
  //       'html': cita.toString(),
  //       'id': cita.fecha,
  //       'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss
  //     });

  //     bloque.append(elemento);
  //   }
  // }

  cargarCitas(listaCitas: Cita[]) {
    let dia = UsuariosService.fechaCitaActiva;
    this.fecha = new Date(dia);
    let fechaFinalHoy = this.fecha.getFullYear() + " " + (this.fecha.getMonth() + 1) + " " + this.fecha.getDate();
    //var bloque = (document.getElementById("lista_citas") as HTMLIonListElement);
    let bloque = $("#lista_citas");

    //Comprobamos que el bloque este vacio antes de emepzar la impresion de citas.
    bloque.empty();

    for (const cita of listaCitas) {
      let fechaCita = new Date(cita.fecha);
      let fechaFinalCita = fechaCita.getFullYear() + " " + (fechaCita.getMonth() + 1) + " " + fechaCita.getDate();
      console.log(fechaFinalHoy, " fecha hoy")
      console.log(fechaFinalCita, " fecha cita");
      
      if (fechaFinalHoy === fechaFinalCita) {
        let elemento = $('<ion-item/>', {
          'html': `${cita.nombreCliente}  ${cita.presupuesto}  ${cita.fecha}`,//Revisar fecha
          'id': cita.fecha,
          'class': 'cita' //Para dar estilos a la cita ir a theme/variables.scss
        }
        );
        this.usuario.listaCitas.push(cita);
        bloque.append(elemento);
      }

    }
  }

  modificarCita(evt: Event) {

    let elemento = (evt.target) as HTMLIonItemElement;
    UsuariosService.fechaCitaActiva = elemento.id;

    UsuariosService.cita = this.usuario.listaCitas.find(cita => cita.fecha == elemento.id);

    this.router.navigate(['modificar-cita']);
  }
}




