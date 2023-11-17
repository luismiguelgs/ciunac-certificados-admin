import { Solicitud } from '../Interfaces/Solicitud';
import { firestore } from './firebase';
import { collection, doc, updateDoc, serverTimestamp, addDoc, deleteDoc, getDoc } from 'firebase/firestore'

const dataCollection = 'solicitudes'
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
export const updateItem = (id:string,obj:Solicitud)=>{
    let dataToUpdate = doc(firestore, dataCollection, id);
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
      pago:obj.pago,
      modificado: serverTimestamp()
    }).then(()=>{console.log('update');}).catch((err)=>console.log(err.message));
}
export const updateStatus = (id:string, status:string) =>{
  let dataToUpdate = doc(firestore, dataCollection, id);
  updateDoc(dataToUpdate,{
    estado:status,
    modificado: serverTimestamp()
  }).then(()=>{console.log('updateStatus');}).catch((err)=>console.log(err.message));  
}


export const newItem = async(obj:Solicitud) =>{
    const data = {
      nombres: obj.nombres,
      apellidos: obj.apellidos,
      creado: serverTimestamp()
    }
    try{
      await addDoc(db, data)
    }catch(err:any){
      console.log(err.message);
    }
  }