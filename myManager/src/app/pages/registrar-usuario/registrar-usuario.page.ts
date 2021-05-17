import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  private mensajeError: string = "Rellene BIEN todos los datos";
  private mensajeCorrecto: string = "Usuario registrado creada";

  constructor(private autoSvc: AutorizacionService, public componenteIonicService: ComponentesIonicService) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.autoSvc.registrarse(email.value, password.value);
      //Si recuperamos el usuario, comprobaremos si está verificado. Si no, no podrá continuar.
      if (user) {
        console.log('User:', user);
        //Todo: CheckEmail
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  validarDatos(): boolean {
    let correo = (document.getElementById("correoUsuario") as HTMLInputElement);
    let contraseña = (document.getElementById("contraseñaUsuario") as HTMLInputElement);
    if (correo.value.includes("@")) {
      if (contraseña.value.length > 5) {
        return true;
      }else{
        this.mostrarToast("Contraseña superior a 5 caracteres",false);
      }
    }else{
      this.mostrarToast("El correo debe tener indicado el @ y terminar con .com / .es",false);
    }
    return false;
  }

  crear() {
    let correo = (document.getElementById("correoUsuario") as HTMLInputElement);
    let contraseña = (document.getElementById("contraseñaUsuario") as HTMLInputElement);

    if(this.validarDatos()){
      this.mostrarToast(this.mensajeCorrecto,this.validarDatos());
    }

    
  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
  }
}
