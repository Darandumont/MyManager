import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: string = "";
  public clave: string = "";

  constructor(
    //Recibe un objeto ComponentesIonicService que provee los distintos componentes.
    public componenteIonicService: ComponentesIonicService,
    //Objeto Router que permite la navegación entre páginas.
    public router:Router,
  ) { }

  ngOnInit() {
  }

  //Método que llama a la acción que genera el ActionSheet.
  generarActionSheet(){
    this.componenteIonicService.presentActionSheet();
  }

  //Método que recibe una página y va a ella.
  irAPagina(nuevaPagina: string){
    if(this.validarDatos()){
      this.router.navigate([nuevaPagina]);
    }
  }

  //Método para validar los datos del usuario
  validarDatos(): boolean{

    this.usuario = ((document.getElementById("input_usuario") as HTMLInputElement).value);
    this.clave = ((document.getElementById("input_clave") as HTMLInputElement).value);

    console.log(this.usuario, this.clave);
    let mensaje = "Datos incorrectos";
    let valido = false;
    
    if(this.usuario === "dani" && this.clave === "1234"){
      mensaje = "Datos validados con éxito";
      valido = true;

      ((document.getElementById("input_usuario") as HTMLInputElement).value) = "";
      ((document.getElementById("input_clave") as HTMLInputElement).value) = "";
    }

    this.mostrarToast(mensaje, valido);    
    return valido;
  }

  mostrarToast(mensaje: string, valido: boolean){
    this.componenteIonicService.presentToast(mensaje, valido);
  }
}