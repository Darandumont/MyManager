import { Cita } from './citas.modelo';

export class Usuario{

    //Atributos;
    private nombreUsuario: string;
    private claveUsuario: string;
    private listaCitas: [Cita];

    constructor(_nombreUsuario: string, _claveUsuario:string, _listaCitas: [Cita]){
        this.nombreUsuario = _nombreUsuario;
        this.claveUsuario = _claveUsuario;
        this.listaCitas = _listaCitas;
    }

    //Getters
    getNombreUsuario(): string{
        return this.nombreUsuario;
    }

    getClaveUsuario(): string{
        return this.claveUsuario;
    }

    getListaCitas(): [Cita]{
        return this.listaCitas;
    }

    //Setters
    setNombreUsuario(_nombreUsuario: string){
        this.nombreUsuario = _nombreUsuario;
    }

    setClaveUsuario(_claveUsuario: string){
        this.claveUsuario = _claveUsuario;
    }

    setListaCitas(_listaCitas: [Cita]){
        this.listaCitas = _listaCitas;
    }

    //toString.
    toString(): string{

        let listaCitasToString: string = "";
        for(let i = 0; i < this.getListaCitas().length; ++i){
            listaCitasToString += this.getListaCitas()[i].toString();

            //En la última iteración no pondrá la coma.
            if(i < this.getListaCitas().length - 2){
                listaCitasToString += ", ";
            }
        };

        return `Usuario{nombreUsuario='${this.nombreUsuario}', claveUsuario='${this.claveUsuario}', listaCitas='${listaCitasToString}'}`;
    }

}