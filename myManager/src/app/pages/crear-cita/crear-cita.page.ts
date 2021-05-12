import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Cita } from 'src/app/models/citas.modelo';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  private mensajeError: string = "Rellene todos los datos";
  private mensajeCorrecto: string = "Cita creada";
  private dia = new Date();

  constructor( public componenteIonicService: ComponentesIonicService, public router: Router) { }

  ngOnInit() {
    
    $("#diaCita").text(this.dia.toDateString());
    //(document.getElementById("diaCita") as HTMLInputElement).textContent=this.dia.toDateString();
   
  }

  // crear(usuario:Usuario){
  //   var nombre = (document.getElementById("nombreCita") as HTMLInputElement)
  //   var precio = ((document.getElementById("precioCita") as HTMLInputElement));
  //   var valido:boolean = true;
    
  //   if(nombre.value != "" && precio.value!= ""){
  //     this.mostrarToast(this.mensajeCorrecto,valido);
  //     var precioFianl = (precio as any )as number;
  //     var citaNueva = new Cita(usuario.nombreUsuario,nombre.textContent,precioFianl,this.dia,(usuario.listaCitas.length)+1);
  //     usuario.listaCitas.push(citaNueva);
  //     //SE AÑADE LA CITA A LA BASE DE DATOS Y SE LE AÑADE AL USUARIO
  //   }else{
  //     valido = false;
  //     this.mostrarToast(this.mensajeError,valido);
  //   }
  // }

  crear(){
    let nombre: JQuery<HTMLElement> = $("#nombreCita");
    let precio: JQuery<HTMLElement> = $("#precioCita");
    var valido:boolean = true;
    
    if(nombre.val() != "" && precio.val() != ""){
      this.mostrarToast(this.mensajeCorrecto,valido);
      let precioFinal = precio.val() as number;
      let citaNueva = new Cita(UsuariosService.usuario.emailUsuario, nombre.val().toString(),precioFinal,this.dia,(UsuariosService.usuario.listaCitas.length)+1);
      UsuariosService.usuario.listaCitas.push(citaNueva);
      //SE AÑADE LA CITA A LA BASE DE DATOS Y SE LE AÑADE AL USUARIO

      this.retrocederPaginaAnterior(nombre, precio);
    }else{
      valido = false;
      this.mostrarToast(this.mensajeError,valido);
    }
  }

  private mostrarToast(mensaje: string, valido: boolean): void{
    this.componenteIonicService.presentToast(mensaje, valido);
  }

  private retrocederPaginaAnterior(nombre: JQuery<HTMLElement>, password: JQuery<HTMLElement>): void {
    //Si todo correcto vamos a la siguiente página y limpiamos los campos.
    this.router.navigate(['principal']);

    nombre.val("");
    password.val("");
  }

}
