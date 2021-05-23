import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-acceso-fecha',
  templateUrl: './acceso-fecha.page.html',
  styleUrls: ['./acceso-fecha.page.scss'],
})
export class AccesoFechaPage implements OnInit {

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

      let horaFinal = this.formatoHora(fechaCita);
      let formatoFecha = fechaCita.getDate() + "/" + (fechaCita.getMonth() + 1) + "/" + fechaCita.getFullYear()
      if (fechaFinalHoy === fechaFinalCita) {
        let elemento = $('<ion-item/>', {
          'html': `Nombre: ${cita.nombreCliente},  Precio: ${cita.presupuesto}€,  Hora/Fecha: ${horaFinal}  ${formatoFecha} `,
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
