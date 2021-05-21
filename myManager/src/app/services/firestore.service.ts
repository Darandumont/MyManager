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
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService { //HECHO PASO 1: https://medium.com/angular-chile/angular-6-y-firestore-b7f270adcc96

  private static CITAS: string = "citas";
  private static USUARIOS: string = "usuarios";
  public static snapshotChangesSubscription;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  //***********************************************************************************************************************
  //CITAS:

  public borrar(_cita: Cita, id: string) {
    let currentUser = firebase.default.auth().currentUser;

    this.firestore.collection('usuarios').doc(currentUser.uid)
      .collection('citas').doc(id).delete().then(() => {
        console.log("Cita Borrada!");
      }).catch((error) => {
        console.error("Error al borrar cita ", error);
      });
  }

  public modificar(_cita: Cita, id: string, nuevoObj: Cita) {
    let currentUser = firebase.default.auth().currentUser;
    let cita = this.firestore.collection("usuarios").doc(currentUser.uid)
      .collection("citas").doc(id);

    return cita.update({
      nombreUsuario: nuevoObj.nombreUsuario,
      nombreCliente: nuevoObj.nombreCliente,
      presupuesto: nuevoObj.presupuesto,
      fecha: nuevoObj.fecha,
      tamanio:nuevoObj.tamanio
    }).then((function () {
      console.log("CITA MODIFICADA");
      
    })).catch((function(error){
      console.log("ERROR AL MODIFICAR LA CITA");
    }));
  }


  //Agregar una cita
  public agregarCita(_cita: Cita) {
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
  public borrarCita(miCita: Cita) {
    let currentUser = firebase.default.auth().currentUser;
    this.firestore.collection("usuarios").doc(currentUser.uid).collection("citas").get().toPromise().then((lista) => {
      lista.forEach((doc) => {
        let cita = doc.data();

        if (miCita.fecha === cita.fecha) {
          this.borrar(miCita, doc.id);
          console.log("BORRADO");

        }
      })
    })
  }

  public modificarCita(miCita: Cita, nuevaCita:Cita){
    let currentUser = firebase.default.auth().currentUser;
    this.firestore.collection("usuarios").doc(currentUser.uid).collection("citas").get().toPromise().then((lista) => {
      lista.forEach((doc) => {
        let cita = doc.data();

        if (miCita.fecha === cita.fecha) {
          console.log(doc.id);
          
          this.modificar(miCita, doc.id,nuevaCita);

          console.log("BORRADO");

        }
      })
    })
  }

  public getCitas2() {
    let currentUser = firebase.default.auth().currentUser;
    let lista = this.firestore.collection('usuarios').doc(currentUser.uid).collection('citas');
    return lista;
  }

  public getCitas3() {
    //TODO terminar para que recupere un array de citaid en vez de observables
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
    console.log("Imprimiendo desde firestoreservice en getcitas3", items);

  }

  //Actualiza una cita
  public updateCita(_idCita: string, _cita: Cita) {
    return this.firestore.collection(FirestoreService.CITAS).doc(((_idCita as any) as string)).set(_cita);
  }

  //***********************************************************************************************************************
  //USUARIOS:

  //Agregar un usuario
  public agregarUsuario(_usuario: Usuario) {
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
