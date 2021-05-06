import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuarios.modelo';
import { Cita } from '../models/citas.modelo';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //Citas creadas.
  private static usuarios: Usuario[] = [];

  constructor() { }

  //Método para agregar usuarios.
  static agregarUsuarios(_usuarios: Usuario[]){
    UsuariosService.usuarios.push(..._usuarios);
  }

  //Método que crea una cita, la devuelve, y la añade a citas.
  static crearUsuario(_nombreUsuario: string, _claveUsuario: string, _listaCitas: Cita[]): Usuario{
    const usuario: Usuario = new Usuario(_nombreUsuario, _claveUsuario, _listaCitas);
    UsuariosService.usuarios.push(usuario);
    return usuario;
  }

  //Método que devuelve un Usuario por su nombreUsuario.
  static getUsuarioByNombreUsuario(_nombreUsuario: string): Usuario{
    return UsuariosService.usuarios.find(usuario => usuario.getNombreUsuario() === _nombreUsuario);
  }

  //Método que elimina un Usuario por su nombreUsuario.
  static eliminarUsuarioByNombreUsuario(_nombreUsuario: string): boolean{
    let eliminado: boolean = false;

    //Buscamos el índice de la cita.
    let indice: number = UsuariosService.usuarios.findIndex(usuario => usuario.getNombreUsuario() === _nombreUsuario);
    
    if(indice !== -1){
      UsuariosService.usuarios.splice(indice, 1);
      eliminado = true;
    }
    
    return eliminado;
  }
}
