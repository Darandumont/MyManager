import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit{
  mario: Usuario;
  constructor(public router: Router) { }

  //TO DO
  ngOnInit() {
    //evt: JQuery.Event valor a pasar por parametro en caso de error
    $('#lista_citas').on('click', 'ion-item', (evt: Event)=>{
      this.modificarCita(evt);
    });

    this.mario = new Usuario("Marcos", "1234");
    UsuariosService.usuario = this.mario;

  } 

  ionViewWillEnter(){
    $('#lista_citas').empty();
    this.recargarPagina();
  }

  recargarPagina(){
    var dia = new Date();
    $("#dia").text(dia.toDateString());
    //(document.getElementById("dia") as HTMLInputElement).textContent = dia.toDateString();    
    this.cargarCita(this.mario);
  }  

  //Metodo que accede a la ventana de crear cita
  crearCita() {
    this.router.navigate(['crear-cita']);
  }

  cargarCita(usuario: Usuario) {
    let fecha = new Date();
    //var bloque = (document.getElementById("lista_citas") as HTMLIonListElement);
    let bloque = $("#lista_citas");
    for (const cita of usuario.listaCitas) {
      let elementoCita = $('<ion-label/>', {
        'html' : cita.toString(),
        'id' : cita.idCita
      });

      let elemento = $('<ion-item/>', {
        'html' : elementoCita
      });

      bloque.append(elemento);
    }
  }

  modificarCita(evt: Event) {

    let elemento = (evt.target) as HTMLIonItemElement;
    UsuariosService.idCitaActiva = parseInt(elemento.id);

    this.router.navigate(['modificar-cita']);
  }

}




