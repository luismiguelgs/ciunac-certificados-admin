import React from 'react';
import { Isolicitud } from '../Interfaces/Isolicitud';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc, onSnapshot, Timestamp, query, where, orderBy, Query } from 'firebase/firestore'
import { changeDate } from './util';

export default class SolicitudesService
{
  private static dataCollection = 'solicitudes'
  private static db = collection(firestore, this.dataCollection);

  public static fetchItems(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>)
  {
    onSnapshot(this.db, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true)} as Isolicitud
      }));
    });
  }
  public static fetchItemQueryDate(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>,fechaInicial:string, fechaFinal:string,order=false)
  {
    let itemQuery: Query
    if(order){
     itemQuery = query(this.db, 
        where('estado',"==","ENTREGADO"), 
        where('creado',">=",new Date(fechaInicial)),
        where('creado',"<=",new Date(fechaFinal)), 
        orderBy('creado','asc'))
    }else{
      itemQuery =  query(this.db, where('creado',">=",new Date(fechaInicial)),where('creado',"<=",new Date(fechaFinal)))
    }
    
    onSnapshot(itemQuery, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true) } as Isolicitud
      }));
    });
  }
  public static fetchItemQuery(
    setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>,
    searchParams:string | null,
    order=true,
    //temp=false,
    //setTempData?:React.Dispatch<React.SetStateAction<Isolicitud[]>>,
  )
  {
    let itemQuery: Query
    if(order){
      itemQuery =  query(this.db, where('estado',"==",searchParams),orderBy('creado','asc'))
    }else{
      itemQuery =  query(this.db, where('apellidos',">=",searchParams))
    }
    
    onSnapshot(itemQuery, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true)  } as Isolicitud
      }));
      /*
      if(temp){
        setTempData(data.docs.map((item)=>{
          return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true)  } as Isolicitud
        }));
      }
      */
    });
  }
  public static async newItem(obj:Isolicitud)
  {
    const data = {
      estado:'NUEVO',
      solicitud:obj.solicitud,
      apellidos:obj.apellidos,
      nombres:obj.nombres,
      celular:obj.celular,
      codigo:obj.codigo,
      dni:obj.dni,
      email:obj.email,
      idioma:obj.idioma,
      nivel:obj.nivel,
      numero_voucher:obj.numero_voucher,
      facultad:obj.facultad,
      fecha_pago:obj.fecha_pago,
      pago:+obj.pago,
      manual:true,
      creado: obj.creado === ''? serverTimestamp() : this.dateToTimestamp(obj.creado),
      modificado: serverTimestamp()
    }
    try{
      await addDoc(this.db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }
  public static async getItem(id:string) 
  {
    const docRef = doc(firestore, this.dataCollection, id)
		const snapShot = await getDoc(docRef)
		return {
			...snapShot.data(),
			id: snapShot.id
		}
  }
  public static updateItem(obj:Isolicitud)
  {
    let dataToUpdate = doc(firestore, this.dataCollection, obj.id as string);
    updateDoc(dataToUpdate,{
      estado:obj.estado,
      solicitud:obj.solicitud,
      apellidos:obj.apellidos,
      nombres:obj.nombres,
      celular:obj.celular,
      codigo:obj.codigo,
      dni:obj.dni,
      email:obj.email,
      idioma:obj.idioma,
      nivel:obj.nivel,
      numero_voucher:obj.numero_voucher,
      facultad:obj.facultad,
      fecha_pago:obj.fecha_pago,
      pago:+obj.pago,
      modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }
  public static async deleteItem (id:string | undefined)
  {
    try{
      await deleteDoc(doc(firestore,this.dataCollection,id as string));
    }
    catch(err:any){
      console.log(err.message);
    }
  }
  public static updateStatus = (id:string, status:string) =>{
    let dataToUpdate = doc(firestore, this.dataCollection, id);
    updateDoc(dataToUpdate,{
      estado:status,
      modificado: serverTimestamp()
    }).then(()=>{console.log('updateStatus');}).catch((err)=>console.log(err.message));  
  }
  public static updateImagen = (id:string) =>{
    let dataToUpdate = doc(firestore, this.dataCollection, id);
    updateDoc(dataToUpdate,{
      voucher: 'borrado',
      modificado: serverTimestamp()
    }).then(()=>{console.log('updateStatus');}).catch((err)=>console.log(err.message));  
  }
  private static dateToTimestamp(date:string)
  {
    const partesFecha = date.split("-");
    const anio = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1; // Meses en JavaScript son de 0 a 11
    const dia = parseInt(partesFecha[2], 10);

    const fechaObj = new Date(anio,mes,dia)
    return Timestamp.fromDate(fechaObj)
  }
}









