/*
Este servicio sirve para tener centralizadas todas las llamadas
a los distintos componentes de Ionic desde cualquier página de la app.
*/
import { Injectable } from '@angular/core';
import { ActionSheetController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentesIonicService {

  constructor(
    public actionSheetController: ActionSheetController,
    public toastController: ToastController
  ) { }

  //Método que devuelve un ActionSheet.
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  //Método que devuelve un Toast
  async presentToast(mensaje: string, valido: boolean = true) {
    const toast = await this.toastController.create({
      message: mensaje,
      color: valido? "success": "danger",
      duration: 2000
    });
    toast.present();
  }
  
}
