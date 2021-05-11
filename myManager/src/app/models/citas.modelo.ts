//Clase que representa una cita en base de datos.
export class Cita{
    //Atributos;
    idCita: number;//PK, autoincrementada en la base de datos.
    nombreUsuario: string;//FK, en base de datos que hace referencia a la PK de Usuarios.
    nombreCliente: string;
    presupuesto: number;
    fecha: Date;

    constructor(_nombreUsuario: string, _nombreCliente:string, _presupuesto: number, _fecha: Date, _idCita: number){
        this.idCita = _idCita;
        this.nombreUsuario = _nombreUsuario;
        this.nombreCliente = _nombreCliente;
        this.presupuesto = _presupuesto;
        this.fecha = _fecha;
    }

    //toString.
    toString(): string{
        return `${this.idCita}  ${this.nombreUsuario}  ${this.nombreCliente}  ${this.presupuesto}  ${this.fecha}` ;
    }
}