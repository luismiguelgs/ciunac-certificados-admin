import React from 'react';
import Icertificado from '../Interfaces/Icertificado';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc, onSnapshot } from 'firebase/firestore'


export default class CertificadosService
{
  private static dataCollection = 'certificados'
  private static db = collection(firestore, 'certificados')

  public static fetchItems(setData:React.Dispatch<React.SetStateAction<Icertificado[]>>)
  {
    onSnapshot(this.db, (data)=>{
      setData(data.docs.map((item)=>{
        return { ...item.data(), id:item.id  } as Icertificado
      }));
    });
  }
  public static async newItem(obj:Icertificado)
  {
    const data = {
      value: obj.value,
      label: obj.label,
      precio: obj.precio,
      creado: serverTimestamp()
    }
    try{
      await addDoc(this.db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }
  public static async getItem(id:string | undefined)
  {
    const docRef = doc(firestore, this.dataCollection, id as string)
		const snapShot = await getDoc(docRef)
		return {
			...snapShot.data(),
			id: snapShot.id
		}
  }
  public static updateItem(id:string, obj:Icertificado)
  {
    let dataToUpdate = doc(firestore, this.dataCollection, id);
    updateDoc(dataToUpdate,{
        value: obj.value,
        label: obj.label,
        precio: obj.precio,
        modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }
  public static async deleteItem(id:string | undefined)
  {
    try{
      await deleteDoc(doc(firestore,this.dataCollection,id as string));
    }
    catch(err:any){
      console.log(err.message);
    }
  }
}