import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { CalendarPage } from '../modals/calendar/calendar.page';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  selectedDate: Date;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private modalCtrl: ModalController, public router: Router) { }

  ngOnInit() {

  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }


  onViewTitleChanged(title) {    
    this.viewTitle = title;
  }

  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false
        });
      }
    }
    this.eventSource = events;    
  }

  removeEvents() {
    this.eventSource = [];
  }

  // METODO PARA ABRIR LA VENTANA MODAL QUE NO LA NECESITAMOS
  // async openCallModal() {
  //   const modal = await this.modalCtrl.create({
  //     component: CalendarPage,
  //     cssClass: 'cal-modal',
  //     backdropDismiss: false
  //   });

  //   await modal.present();

  //   modal.onDidDismiss().then((result) => {
  //     if (result.data && result.data.event) {
  //       let event = result.data.event;
  //       if (event.allDay) {
  //         let start = event.startTime;
  //         event.startTime = new Date(
  //           Date.UTC(
  //             start.getUTCFullYear(),
  //             start.getUTCMonth(),
  //             start.getUTCDate()
  //           )
  //         );
  //         event.endTime = new Date(
  //           Date.UTC(
  //             start.getUTCFullYear(),
  //             start.getUTCMonth(),
  //             start.getUTCDate() + 1
  //           )
  //         )

  //       }
  //       UsuariosService.fechaCitaActiva = event.startTime.toDateString();
  //       this.eventSource.push(result.data.event);
  //       //Posiblemente quede algo por poner aquí, por que en el video no se veía bien
  //       //revisar https://www.youtube.com/watch?v=_hVdPEmbwA0
  //     }

  //   });
  // }

  onTimeSelected(event){
    let a =event;
    let fecha = new Date (a.selectedTime);
    UsuariosService.fechaCitaActiva = fecha.toDateString();    
    //this.router.navigate(["acceso-fecha"]);
  }

  mostrarCita(){
    this.router.navigate(["acceso-fecha"]);
  }

  crearCita() {
     this.router.navigate(["crear-cita"]);
  }


}


