import React from 'react';
import { Icurso } from '../Interfaces/Icurso';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc, onSnapshot } from 'firebase/firestore'
import { changeDate } from './util';

export default class CursosService 
{
  private static dataCollection = 'cursos'
  private static db = collection(firestore, this.dataCollection)

  public static fetchItems(setData:React.Dispatch<React.SetStateAction<Icurso[]>>) 
  {
    React.useEffect(()=>{
        onSnapshot(this.db, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id, creado:changeDate(item.data().creado) } as Icurso
          }));
        });
    },[]);
  }
  public static newItem = async(obj:Icurso) =>{
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
  public static updateItem = (obj:Icurso)=>{
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