import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild("input_usuario") inputUsuario: ElementRef;

  public usuario: string = "";
  public clave: string = "";

  constructor(
    //Recibe un objeto ComponentesIonicService que provee los distintos componentes.
    public componenteIonicService: ComponentesIonicService,
    //Objeto Router que permite la navegación entre páginas.
    public router:Router,
    private renderer: Renderer2
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

    console.log(this.usuario, this.clave);
    let mensaje = "Error al validar los datos";
    let valido = false;

    if(this.usuario === "dani" && this.clave === "1234"){
      mensaje = "Validado con éxito";
      valido = true;

      console.log("estamos aqui: ", this.renderer.selectRootElement(this.inputUsuario.nativeElement).value);
      this.renderer.selectRootElement(this.inputUsuario.nativeElement).value;
    }

    this.mostrarToast(mensaje);
    this.usuario = "";
    this.clave = "";
    return valido;
  }

  //Método que se lanza cada vez que se modifica alguno de los inputs.
  ionChangeInput(event){
    if(event.target.id === "input_usuario"){
      this.usuario = event.target.value;
    }else{
      this.clave = event.target.value;
    }
  }

  mostrarToast(mensaje: string){
    this.componenteIonicService.presentToast(mensaje);
  }
}