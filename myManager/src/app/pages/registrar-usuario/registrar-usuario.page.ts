import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from 'src/app/services/autorizacion.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {

  constructor(private autoSvc: AutorizacionService) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    try {
      const user = await this.autoSvc.registrarse(email.value, password.value);
      //Si recuperamos el usuario, comprobaremos si está verificado. Si no, no podrá continuar.
      if(user){
        console.log('User:', user);
        //Todo: CheckEmail
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

}
