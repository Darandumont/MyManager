import { Injectable } from '@angular/core';
import { Cita } from '../models/citas.modelo';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  //Citas creadas.
  private citas: Cita[] = [];

  constructor() { }

  //Método que crea una cita, la devuelve, y la añade a citas.
  crearCita(_idCita: number, _nombreUsuario: string, _nombreCliente: string, _presupuesto: number, _fecha: Date): Cita{
    const cita: Cita = new Cita(_idCita, _nombreUsuario, _nombreCliente, _presupuesto, _fecha);
    this.citas.push(cita);
    return cita;
  }

  //Método que devuelve una cita por su id.
  getCitaById(_idCita: number): Cita{
    return this.citas.find(cita => cita.getIdCita() === _idCita);
  }

  //Método que elimina la cita por el id.
  eliminarCitaById(_idCita: number): boolean{
    let eliminada: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = this.citas.findIndex(cita => cita.getIdCita() === _idCita);
    
    if(indice !== -1){
      this.citas.splice(indice, 1);
      eliminada = true;
    }
    
    return eliminada;
  }

}
