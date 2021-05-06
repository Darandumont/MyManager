//Clase que representa una cita en base de datos.
export class Cita{
    //Atributos;
    private idCita: number;//PK, autoincrementada en la base de datos.
    private nombreUsuario: string;//FK, en base de datos que hace referencia a la PK de Usuarios.
    private nombreCliente: string;
    private presupuesto: number;
    private fecha: Date;

    constructor(_nombreUsuario: string, _nombreCliente:string, _presupuesto: number, _fecha: Date, _idCita: number){
        this.idCita = _idCita;
        this.nombreUsuario = _nombreUsuario;
        this.nombreCliente = _nombreCliente;
        this.presupuesto = _presupuesto;
        this.fecha = _fecha;
    }

    //Getters.
    getIdCita(): number{
        return this.idCita;
    }

    getNombreUsuario(): string{
        return this.nombreUsuario;
    }

    getNombreCliente(): string{
        return this.nombreCliente;
    }

    getPresupuesto(): number{
        return this.presupuesto;
    }

    getFecha(): Date{
        return this.fecha;
    }

    //Setters.
    setIdCita(_idCita: number){
        this.idCita = _idCita;
    }

    setNombreCliente(_nombreCliente: string){
        this.nombreCliente = _nombreCliente;
    }

    setPresupuesto(_presupuesto: number){
        this.presupuesto = _presupuesto;
    }

    setFecha(_fecha: Date){
        this.fecha = _fecha;
    }

    //toString.
    toString(): string{
        return `Cita{idCita='${this.idCita}', nombreUsuarios='${this.nombreUsuario}', nombreCliente='${this.nombreCliente}', presupuesto='${this.presupuesto}', fecha='${this.fecha}'}`;
    }
}