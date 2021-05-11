import { Cita } from './citas.modelo';

export class Usuario{

    //Atributos;
    nombreUsuario: string; //PK en la base de datos.
    claveUsuario: string;
    listaCitas: Cita[];

    constructor(_nombreUsuario: string, _claveUsuario:string, _listaCitas: Cita[] = []){
        this.nombreUsuario = _nombreUsuario;
        this.claveUsuario = _claveUsuario;
        this.listaCitas = _listaCitas;
    }    

    //toString.
    toString(): string{

        let listaCitasToString: string = "";
        for(let i = 0; i < this.listaCitas.length; ++i){
            listaCitasToString += this.listaCitas[i].toString();

            //En la última iteración no pondrá la coma.
            if(i < this.listaCitas.length - 2){
                listaCitasToString += ", ";
            }
        };

        return `Usuario{nombreUsuario='${this.nombreUsuario}', claveUsuario='${this.claveUsuario}', listaCitas='${listaCitasToString}'}`;
    }

}