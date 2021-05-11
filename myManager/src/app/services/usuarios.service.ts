import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.modelo';
import { Cita } from '../models/citas.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  static idCitaActiva: number;
  static usuario: Usuario;

  constructor() { }

  //Método para agregar citas.
  static agregarCitas(_citas: Cita[]){
    this.usuario.listaCitas.push(..._citas);
  }

  //Método que crea una cita, la devuelve, y la añade a citas.
  static crearCita(_nombreUsuario: string, _nombreCliente: string, _presupuesto: number, _fecha: Date, _idCita: number = -1): Cita{
    const cita: Cita = new Cita(_nombreUsuario, _nombreCliente, _presupuesto, _fecha, _idCita);
    this.usuario.listaCitas.push(cita);
    return cita;
  }

  //Método que devuelve una cita por su id.
  static getCitaById(_idCita: number): Cita{
    return this.usuario.listaCitas.find(cita => cita.idCita === _idCita);
  }

  //Método que elimina la cita por el id.
  static eliminarCitaById(_idCita: number): boolean{
    let eliminada: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = this.usuario.listaCitas.findIndex(cita => cita.idCita === _idCita);
    
    if(indice !== -1){
      this.usuario.listaCitas.splice(indice, 1);
      eliminada = true;
    }
    
    return eliminada;
  }

}
