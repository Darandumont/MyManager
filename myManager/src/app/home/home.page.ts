import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: string = "";
  public clave: string = "";

  private mensajeError: string = "Datos incorrectos";
  private mensajeCorrecto: string = "Datos validados con éxito";

  constructor(
    //Recibe un objeto ComponentesIonicService que provee los distintos componentes.
    public componenteIonicService: ComponentesIonicService,
    //Objeto Router que permite la navegación entre páginas.
    public router: Router,
    private autoSvc: AutorizacionService
  ) { }

  ngOnInit() {
  }

  async entrar(entrar: boolean, email, password){

    let valido = true;
    let mensaje = this.mensajeCorrecto;
    let user;

    try {
<<<<<<< HEAD
      const user = await this.autoSvc.iniciarSesion(email.value, password.value);
      if (user) {
        //Todo: CheckEmail
        console.log("User:", user); 
        console.log("Verificado:", user.emailVerified);

      } else {
        valido = false;
        mensaje = this.mensajeError;
        this.mostrarToast(mensaje, valido);
      }

    } catch (error) {
      console.log("Error:", error);

      valido = false;
      mensaje = this.mensajeError;
    }

   

    if (valido) {
      this.avanzarSiguientePagina(email, password);
    }
  }

  async onLoginGoogle(email, password) {

    let valido = true;
    let mensaje = this.mensajeCorrecto;

    try {
      const user = await this.autoSvc.iniciarSesionGoolge();
      if (user) {
        //Todo: CheckEmail
        console.log("User:", user);  
        console.log("Verificado:", user.emailVerified);

      } else {
=======
      if(entrar){
        user = await this.autoSvc.iniciarSesion(email.value, password.value);
      }else{
        user = await this.autoSvc.iniciarSesionGoolge();
      }

      if (!user) {
>>>>>>> 75abd936e71067d3ef8ded026482c9ba4c14fb02
        valido = false;
        mensaje = this.mensajeError;
        this.mostrarToast(mensaje, valido);
      }

    } catch (error) {
      console.log("Error:", error);

      valido = false;
      mensaje = this.mensajeError;
    }

 

    if (valido) {
      this.avanzarSiguientePagina(email, password);
    }
  }

  private avanzarSiguientePagina(email, password): void{
    //Si todo correcto vamos a la siguiente página y limpiamos los campos.
    this.router.navigate(['principal']);

    email.value = "";
    password.value = "";
  }

  private mostrarToast(mensaje: string, valido: boolean): void{
    this.componenteIonicService.presentToast(mensaje, valido);
  }

  private validarCamposRellenos(email, password): boolean{
    return true;
  }
}