import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { CitasService } from './citas.service';
import { Cita } from '../models/citas.modelo';
import { Usuario } from '../models/usuarios.modelo';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService { //HECHO PASO 1: https://medium.com/angular-chile/angular-6-y-firestore-b7f270adcc96

  private static TABLA_CITAS: string = "citas";
  private static TABLA_USUARIOS: string = "usuarios";

  constructor(
    private firestore: AngularFirestore,
  ) { }

  //***********************************************************************************************************************
  //CITAS:

  //Agregar una cita
  public agregarCita(_cita: Cita){
    return this.firestore.collection(FirestoreService.TABLA_CITAS).add({
     'idCita': _cita.idCita,
     'nombreUsuario': _cita.nombreUsuario,
     'nombreCliente': _cita.nombreCliente,
     'presupuesto': _cita.presupuesto,
     'fecha': _cita.fecha
    });
  }

  //Obtiene una cita
  public getCita(_idCita: number) {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).doc(((_idCita as any) as string)).snapshotChanges();
  }

  //Obtiene todas las citas
  public getCitas() {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).snapshotChanges();
  }

  //Actualiza una cita
  public updateCita(_idCita: number, _cita: Cita) {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).doc(((_idCita as any) as string)).set(_cita);
  }

  //***********************************************************************************************************************
  //USUARIOS:

  //Agregar un usuario
  public agregarUsuario(_usuario: Usuario){
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).add(_usuario);
  }  

  //Obtiene un usuario
  public getUsuario(_nombreUsuario: string) {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).doc(_nombreUsuario).snapshotChanges();
  }

  //Obtiene todos los usuarios
  public getUsuarios() {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).snapshotChanges();
  }

  //Actualiza un usuario
  public updateUsuario(_nombreUsuario: string, usuario: Usuario) {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).doc(_nombreUsuario).set(usuario);
  }
}
