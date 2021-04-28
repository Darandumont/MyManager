import { Component, OnInit } from '@angular/core';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    //Recibe un objeto ComponentesIonicService que provee los distintos componentes.
    public componenteIonicService: ComponentesIonicService 
  ) { }

  ngOnInit() {
  }

  //Método que llama a la acción que genera el ActionSheet.
  generarActionSheet(){
    this.componenteIonicService.presentActionSheet();
  }

}
