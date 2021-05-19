import { Cita } from "./citas.modelo";

//Clase que representa una cita con id en base de datos.
export class CitaID extends Cita{
    //Atributos;
    citaId: string;//PK.

    constructor(_citaId: string, _nombreUsuario: string, _nombreCliente:string, _presupuesto: number, _fecha: string){
        super(_nombreUsuario, _nombreCliente, _presupuesto, _fecha);
        this.citaId = _citaId;
    }

    //toString.
    public toString(): string{
        return `${this.citaId} ${this.nombreUsuario} ${this.nombreCliente}  ${this.presupuesto}  ${this.fecha}` ;
    }
}