import React from 'react';
import { ITexto } from '../Interfaces/ITextos';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'

const dataCollection = 'textos'
const db = collection(firestore, dataCollection);

export const getItems = (setData:React.Dispatch<React.SetStateAction<ITexto[]>>) =>{
    React.useEffect(()=>{
        onSnapshot(db, (data)=>{
          setData(data.docs.map((item)=>{
            return { ...item.data(), id:item.id  } as ITexto
          }));
        });
  },[]);
}

export const updateItem = (obj:ITexto)=>{
    let dataToUpdate = doc(firestore, dataCollection, obj.id as string);
    updateDoc(dataToUpdate,{
        texto: obj.texto,
        modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
}