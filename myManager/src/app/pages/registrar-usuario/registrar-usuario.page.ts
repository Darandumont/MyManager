import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuarios.modelo';
import { AutorizacionService } from 'src/app/services/autorizacion.service';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  private mensajeErrorCorreo: string = "El correo debe tener indicado el @ y terminar con .com /.es";
  private mensajeErrorContraseña: string = "Contraseña superior a 5 caracteres";
  private mensajeCorrecto: string = "Usuario registrado creada";

  constructor(private autoSvc: AutorizacionService, public componenteIonicService: ComponentesIonicService,
    public router: Router,
    public firestore: FirestoreService,
    public autozirar: AutorizacionService) { }

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
    let repetirContraseña = (document.getElementById("repetirContraseñaUsuario") as HTMLInputElement);
    if (correo.value.includes("@")) {
      if (contraseña.value === repetirContraseña.value) {
        if (contraseña.value.length > 5 && repetirContraseña.value.length > 5) {
          return true;
        } else {
          this.mostrarToast(this.mensajeErrorContraseña, false);
        }
      } else {
        this.mostrarToast("Las contraseñas deben coincidir", false);
      }
    } else {
      this.mostrarToast(this.mensajeErrorCorreo, false);
    }
    return false;
  }

  agregarUsuario() {
    let correo = (document.getElementById("correoUsuario") as HTMLInputElement);
    let contraseña = (document.getElementById("contraseñaUsuario") as HTMLInputElement);

    if (this.validarDatos()) {
      this.autozirar.registrarse(correo.value, contraseña.value)
        .then(() => {
          console.log("Usuario añadido");
          this.mostrarToast(this.mensajeCorrecto, true);
          this.router.navigate(["home"]);
        })
        .catch((err) => {
          console.log("Error al añadir el usuario", err);
          this.mostrarToast("Error al añadir el usuario", false);
        });
      contraseña.value = "";
      correo.value = " "
    } else {
      this.mostrarToast("Error al añadir el usuario", this.validarDatos());
    }


  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
  }
}
