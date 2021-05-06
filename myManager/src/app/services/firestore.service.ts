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
    return this.firestore.collection(FirestoreService.TABLA_CITAS).add(_cita);
  }

  //Obtiene una cita
  public getCita(_documentID: string) {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).doc(_documentID).snapshotChanges();
  }

  //Obtiene todas las citas
  public getCitas() {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).snapshotChanges();
  }

  //Actualiza una cita
  public updateCita(documentId: string, data: any) {
    return this.firestore.collection(FirestoreService.TABLA_CITAS).doc(documentId).set(data);
  }

  //***********************************************************************************************************************
  //USUARIOS:

  //Agregar un usuario
  public agregarUsuario(_usuario: Usuario){
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).add(_usuario);
  }  

  //Obtiene un usuario
  public getUsuario(_documentID: string) {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).doc(_documentID).snapshotChanges();
  }

  //Obtiene todos los usuarios
  public getUsuarios() {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).snapshotChanges();
  }

  //Actualiza un usuario
  public updateUsuario(documentId: string, data: any) {
    return this.firestore.collection(FirestoreService.TABLA_USUARIOS).doc(documentId).set(data);
  }
}
