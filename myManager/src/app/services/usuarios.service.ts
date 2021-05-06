import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.modelo';
import { Cita } from '../models/citas.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //Citas creadas.
  private usuarios: Usuario[] = [];

  constructor() { }

  //Método que crea una cita, la devuelve, y la añade a citas.
  crearUsuario(_nombreUsuario: string, _claveUsuario: string, _listaCitas: Cita[]): Usuario{
    const usuario: Usuario = new Usuario(_nombreUsuario, _claveUsuario, _listaCitas);
    this.usuarios.push(usuario);
    return usuario;
  }

  //Método que devuelve un Usuario por su nombreUsuario.
  getUsuarioByNombreUsuario(_nombreUsuario: string): Usuario{
    return this.usuarios.find(usuario => usuario.getNombreUsuario() === _nombreUsuario);
  }

  //Método que elimina un Usuario por su nombreUsuario.
  eliminarUsuarioByNombreUsuario(_nombreUsuario: string): boolean{
    let eliminado: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = this.usuarios.findIndex(usuario => usuario.getNombreUsuario() === _nombreUsuario);
    
    if(indice !== -1){
      this.usuarios.splice(indice, 1);
      eliminado = true;
    }
    
    return eliminado;
  }
}
