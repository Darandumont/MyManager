import { Component, OnInit } from '@angular/core';
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
export class PrincipalPage implements OnInit {
  mario: Usuario;
  constructor(public router: Router) { }

  //TO DO
  ngOnInit() {
    //evt: JQuery.Event valor a pasar por parametro en caso de error
    $('#lista_citas').on('click', 'ion-label', ()=>{
      this.modificarCita();
    });

    var dia = new Date();
    (document.getElementById("dia") as HTMLInputElement).textContent = dia.toDateString();
    let citas = [];
    this.mario = new Usuario("Marcos", "1234", citas);
    UsuariosService.agregarUsuario(this.mario);
    this.cargarCita(this.mario);

  }  

  //Metodo que accede a la ventana de crear cita
  crearCita() {
    this.router.navigate(['crear-cita']);

  }


  cargarCita(usuario: Usuario) {
    let fecha = new Date();
    usuario.listaCitas.push(new Cita("Marcos", "Mario", 100, fecha, 1));
    usuario.listaCitas.push(new Cita("Marcos", "Dni", 750, fecha, 1));
    var bloque = (document.getElementById("lista_citas") as HTMLIonListElement);
    for (const cita of usuario.listaCitas) {
      var elemento = document.createElement("ion-item");
      var elementoCita = document.createElement("ion-label");
      elementoCita.textContent = cita.toString();
      elemento.appendChild(elementoCita);
      bloque.appendChild(elemento);
    }
  }


  modificarCita() {

    this.router.navigate(['modificar-cita']);
  }

}




