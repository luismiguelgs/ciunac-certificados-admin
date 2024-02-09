export interface ITexto{
    id?:string,
    titulo:string,
    texto:string,
    creado?:Date,
    Modificado?:Date
}
export interface Ifacultad{  
    id?:string,
    value:string,
    label:string
    creado?:string,
    modificado?:string
}
export interface Icurso{
    id?:string,
    value:string,
    label:string,
    creado?:string,
    modificado?:string
}
export interface Icertificado{  
    id?:string,
    value:string,
    label:string,
    precio:number
}
  