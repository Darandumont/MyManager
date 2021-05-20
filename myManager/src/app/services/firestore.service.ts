import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
//import { CitasService } from './citas.service';
import { Cita } from '../models/citas.modelo';
import { Usuario } from '../models/usuarios.modelo';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { CitaID } from '../models/citasID.modelo';
import { UsuariosService } from './usuarios.service';
import { AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService { //HECHO PASO 1: https://medium.com/angular-chile/angular-6-y-firestore-b7f270adcc96

  public listaCitasRef: AngularFireList<any>;
  public citaRef: AngularFireObject<any>;

  private static CITAS: string = "citas";
  private static USUARIOS: string = "usuarios";
  public static snapshotChangesSubscription;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  //***********************************************************************************************************************
  //CITAS:

  //Agregar una cita
  public agregarCita(_cita: Cita){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.default.auth().currentUser;
      this.firestore.collection('usuarios').doc(currentUser.uid)
      .collection('citas').add({
        nombreUsuario: _cita.nombreUsuario,
        nombreCliente: _cita.nombreCliente,
        presupuesto: _cita.presupuesto,
        fecha: _cita.fecha,
        tamanio: _cita.tamanio
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
    // return this.firestore.collection(FirestoreService.TABLA_CITAS).add({
    //  'idCita': _cita.idCita,
    //  'nombreUsuario': _cita.nombreUsuario,
    //  'nombreCliente': _cita.nombreCliente,
    //  'presupuesto': _cita.presupuesto,
    //  'fecha': _cita.fecha
    // });
  }

  //Obtiene una cita
  public getCita(_idCita: number) {
    return this.firestore.collection(FirestoreService.CITAS).doc(((_idCita as any) as string)).snapshotChanges();
  }

  //Obtiene todas las citas
  public getCitas() {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.default.auth().currentUser;
      FirestoreService.snapshotChangesSubscription = this.firestore.collection('usuarios').doc(currentUser.uid)
      .collection('citas').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
    //return this.firestore.collection(FirestoreService.CITAS).snapshotChanges();
  }

  public getCitas2(){
    let currentUser = firebase.default.auth().currentUser;
    return this.firestore.collection('usuarios').doc(currentUser.uid).collection('citas').valueChanges();
  }

  public getCitas3(){
    let itemsCollection: AngularFirestoreCollection<Cita>;
    let items: Observable<CitaID[]>;
    

    let currentUser = firebase.default.auth().currentUser;
    itemsCollection = this.firestore.collection('usuarios').doc(currentUser.uid).collection<Cita>('citas');
    items = itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Cita;
        const id = a.payload.doc.id;
        return new CitaID(id, data.nombreUsuario, data.nombreCliente, data.presupuesto, data.fecha, data.tamanio);
      }))
    );

    UsuariosService.listaCitasID = [];
    items.forEach(lista => lista.forEach(item =>{
      UsuariosService.listaCitasID.push(item);
    }));
    
  }

  //Actualiza una cita
  public updateCita(_idCita: string, _cita: Cita) {
    return this.firestore.collection(FirestoreService.CITAS).doc(((_idCita as any) as string)).set(_cita);
  }

  //***********************************************************************************************************************
  //USUARIOS:

  //Agregar un usuario
  public agregarUsuario(_usuario: Usuario){
    return this.firestore.collection(FirestoreService.USUARIOS).add(_usuario);
  }  

  //Obtiene un usuario
  public getUsuario(_nombreUsuario: string) {
    return this.firestore.collection(FirestoreService.USUARIOS).doc(_nombreUsuario).snapshotChanges();
  }

  //Obtiene todos los usuarios
  public getUsuarios() {
    return this.firestore.collection(FirestoreService.USUARIOS).snapshotChanges();
  }

  //Actualiza un usuario
  public updateUsuario(_nombreUsuario: string, usuario: Usuario) {
    return this.firestore.collection(FirestoreService.USUARIOS).doc(_nombreUsuario).set(usuario);
  }
}
