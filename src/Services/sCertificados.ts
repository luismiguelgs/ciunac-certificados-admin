import Icertificado from '../Interfaces/Icertificado';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc } from 'firebase/firestore'

const dataCollection = 'certificados'
const db = collection(firestore, dataCollection);

export const deleteItem = async(id:string | undefined) =>{
    try{
      await deleteDoc(doc(firestore,dataCollection,id as string));
    }
    catch(err:any){
      console.log(err.message);
    }
}
export const selectItem = async(id:string) => {
    const docRef = doc(firestore, dataCollection, id)
		const snapShot = await getDoc(docRef)
		return {
			...snapShot.data(),
			id: snapShot.id
		}
  }
export const updateItem = (id:string,obj:Icertificado)=>{
    let dataToUpdate = doc(firestore, dataCollection, id);
    updateDoc(dataToUpdate,{
        value: obj.value,
        label: obj.label,
        precio: obj.precio,
        modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
}

export const newItem = async(obj:Icertificado) =>{
    const data = {
      value: obj.value,
      label: obj.label,
      precio: obj.precio,
      creado: serverTimestamp()
    }
    try{
      await addDoc(db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }