import { Injectable } from '@angular/core';
import { Cita } from '../models/citas.modelo';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  //Citas creadas.
  private static citas: Cita[] = [];

  constructor() { }

  //Método para agregar citas.
  static agregarCitas(_citas: Cita[]){
    CitasService.citas.push(..._citas);
  }

  //Método que crea una cita, la devuelve, y la añade a citas.
  static crearCita(_nombreUsuario: string, _nombreCliente: string, _presupuesto: number, _fecha: Date, _idCita: number = -1): Cita{
    const cita: Cita = new Cita(_nombreUsuario, _nombreCliente, _presupuesto, _fecha, _idCita);
    CitasService.citas.push(cita);
    return cita;
  }

  //Método que devuelve una cita por su id.
  static getCitaById(_idCita: number): Cita{
    return CitasService.citas.find(cita => cita.getIdCita() === _idCita);
  }

  //Método que elimina la cita por el id.
  static eliminarCitaById(_idCita: number): boolean{
    let eliminada: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = CitasService.citas.findIndex(cita => cita.getIdCita() === _idCita);
    
    if(indice !== -1){
      CitasService.citas.splice(indice, 1);
      eliminada = true;
    }
    
    return eliminada;
  }

}
