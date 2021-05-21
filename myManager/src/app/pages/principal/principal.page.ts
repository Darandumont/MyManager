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

    //Guardamos el usuario con el que han logueado. Seria usuario logueado por GOOGLE
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

    this.firestore.getCitas2().valueChanges().subscribe(listaCitas => {
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

      let horaFinal = this.formatoHora(fechaCita);
      let formatoFecha = fechaCita.getDate() + "/" + (fechaCita.getMonth() + 1) + "/" + fechaCita.getFullYear()
      if (fechaFinalHoy === fechaFinalCita) {
        let elemento = $('<ion-item/>', {
          'html': `Nombre: ${cita.nombreCliente},  Precio: ${cita.presupuesto}€,  Hora/Fecha: ${horaFinal}  ${formatoFecha} `,
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

  formatoHora(fechaCita: Date): string {
    let formatoFecha = "";

    if(fechaCita.getHours()<10){
      formatoFecha+="0"+fechaCita.getHours()+"/";
    }else{
      formatoFecha+=fechaCita.getHours()+"/";
    }

    if(fechaCita.getMinutes()<10){
      formatoFecha+="0"+fechaCita.getMinutes();
    }else{
      formatoFecha+=fechaCita.getMinutes();
    }
    return formatoFecha;
  }
}




