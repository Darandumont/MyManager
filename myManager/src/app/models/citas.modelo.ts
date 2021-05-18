//Clase que representa una cita en base de datos.
export class Cita{
    //Atributos;
    nombreUsuario: string;//FK, en base de datos que hace referencia a la PK de Usuarios.
    nombreCliente: string;
    presupuesto: number;
    fecha: string;//PK junto con nombre de usuario.

    constructor(_nombreUsuario: string, _nombreCliente:string, _presupuesto: number, _fecha: string){
        this.nombreUsuario = _nombreUsuario;
        this.nombreCliente = _nombreCliente;
        this.presupuesto = _presupuesto;
        this.fecha = _fecha;
    }

    //toString.
    public toString(): string{
        return `${this.nombreUsuario} ${this.nombreCliente}  ${this.presupuesto}  ${this.fecha}` ;
    }
}