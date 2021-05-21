import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ComponentesIonicService } from 'src/app/services/componentes-ionic.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-confirmar-borrar',
  templateUrl: './confirmar-borrar.page.html',
  styleUrls: ['./confirmar-borrar.page.scss'],
})
export class ConfirmarBorrarPage implements OnInit {

  constructor(public componenteIonicService: ComponentesIonicService,
    public modalController: ModalController,
    public firestore: FirestoreService) { }

  ngOnInit() {
  }

  borrar(aceptado: boolean) {
    if (aceptado) {
      this.firestore.borrarCita(UsuariosService.cita);
      this.mostrarToast("Cita borrada", true);

    }else{
      this.mostrarToast("Error al brorar la cita", false);
    }
    this.modalController.dismiss();


  }

  private mostrarToast(mensaje: string, valido: boolean): void {
    this.componenteIonicService.presentToast(mensaje, valido);
  }


}