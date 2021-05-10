import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.page.html',
  styleUrls: ['./crear-cita.page.scss'],
})
export class CrearCitaPage implements OnInit {
  private mensajeError: string = "Rellene todos los datos";
  private mensajeCorrecto: string = "Cita creada";

  constructor( public componenteIonicService: ComponentesIonicService) { }

  ngOnInit() {
    var dia = new Date();
    (document.getElementById("diaCita") as HTMLInputElement).textContent=dia.toDateString();
   
  }

  crear(usuario:Usuario){
    var nombre = (document.getElementById("nombreCita") as HTMLInputElement)
    var precio = ((document.getElementById("precioCita") as HTMLInputElement));
    var valido:boolean = true;
    
    if(nombre.value != "" && precio.value!= ""){
      this.mostrarToast(this.mensajeCorrecto,valido);
    }else{
      valido = false;
      this.mostrarToast(this.mensajeError,valido);
    }
  }

  private mostrarToast(mensaje: string, valido: boolean): void{
    this.componenteIonicService.presentToast(mensaje, valido);
  }

}
