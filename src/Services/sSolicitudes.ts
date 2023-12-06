import React from 'react';
import { Isolicitud } from '../Interfaces/Isolicitud';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc, onSnapshot, Query } from 'firebase/firestore'
import { changeDate } from './util';

export default class SolicitudesService
{
  private static dataCollection = 'solicitudes'
  private static db = collection(firestore, this.dataCollection);

  public static fetchItems(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>)
  {
    React.useEffect(()=>{
      onSnapshot(this.db, (data)=>{
        setData(data.docs.map((item)=>{
          return { ...item.data(), id:item.id } as Isolicitud
        }));
      });
    },[]);
  }
  public static fetchItemQuery(setData:React.Dispatch<React.SetStateAction<Isolicitud[]>>,query:Query)
  {
    React.useEffect(()=>{
      onSnapshot(query, (data)=>{
        setData(data.docs.map((item)=>{
          return { ...item.data(), id:item.id, creado:changeDate(item.data().creado,true) } as Isolicitud
        }));
      });
    },[]);
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
      creado: serverTimestamp()
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
}









