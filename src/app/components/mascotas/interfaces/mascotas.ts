export interface Mascota {
  idMascota: number;
  idPropietario: number;
  nombre: string;
  idRaza: number;
  edad: number;
  objPropietario: {
    idPropietario: number;
    nombre: string;
    apellido: string;
    correoElectronico: string;
    telefono: string;
  };
  objRaza: {
    idRaza: number;
    idEspecie: number;
    nombreRaza: string;
    objEspecie: {
      idEspecie: number;
      nombreEspecie: string;
    };
  };
}

export interface DatosMascota {
  IdPropietario: number; 
  nombre: string;      
  IdRaza: number;       
  edad: number;      
}
