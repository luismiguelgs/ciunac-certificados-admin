import React from 'react';
import Ifacultad from '../Interfaces/Ifacultad';
import { firestore } from './firebase';
import { collection, onSnapshot, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc} from 'firebase/firestore'
import { changeDate } from './util';

export default class FacultadesService 
{
  private static dataCollection = 'facultades'
  private static db = collection(firestore, this.dataCollection)

  public static fetchItems(setData:React.Dispatch<React.SetStateAction<Ifacultad[]>>) 
  {
    React.useEffect(()=>{
        onSnapshot(this.db, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id, creado:changeDate(item.data().creado) } as Ifacultad
          }));
        });
    },[]);
  }
  public static newItem = async(obj:Ifacultad) =>{
    const data = {
      value: obj.value,
      label: obj.label,
      creado: serverTimestamp()
    }
    try{
      await addDoc(this.db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }
  public static selectItem = async(id:string) => {
    const docRef = doc(firestore, this.dataCollection, id)
	  const snapShot = await getDoc(docRef)
	  return {
		  ...snapShot.data(),
		  id: snapShot.id
	  }
  }
  public static updateItem = (obj:Ifacultad)=>{
    let dataToUpdate = doc(firestore, this.dataCollection, obj.id as string);
    updateDoc(dataToUpdate,{
        value: obj.value,
        label: obj.label,
        modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
  }
  public static deleteItem = async(id:string | undefined) =>{
    try{
      await deleteDoc(doc(firestore,this.dataCollection,id as string));
    }
    catch(err:any){
      console.log(err.message);
    }
  }
}