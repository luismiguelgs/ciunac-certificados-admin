import React from 'react'
import Icertificado from '../Interfaces/Icertificado';
import { firestore } from '../Services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Icurso } from '../Interfaces/Icurso';
import Ifacultad from '../Interfaces/Ifacultad';
import FacultadesService from '../Services/sFacultades';
import CursosService from '../Services/sCursos';

type Props = {
    setCertificados:React.Dispatch<React.SetStateAction<Icertificado[]>>,
    setCursos:React.Dispatch<React.SetStateAction<Icurso[]>>,
    setFacultades:React.Dispatch<React.SetStateAction<Ifacultad[]>>
}

export default function Preloader({setCertificados, setCursos, setFacultades}:Props) 
{
    const db = collection(firestore, 'certificados');
    React.useEffect(()=>{
        onSnapshot(db, (data)=>{
          setCertificados(data.docs.map((item)=>{
            return { ...item.data(), id:item.id  } as Icertificado
          }));
        });
    },[]);

    CursosService.fetchItems(setCursos)

    FacultadesService.fetchItems(setFacultades)
    
    
    

    return (
        <React.Fragment>
            Preloader
        </React.Fragment>
    )
}
