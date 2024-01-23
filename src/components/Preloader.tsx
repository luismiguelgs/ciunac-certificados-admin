import React from 'react'
import Icertificado from '../Interfaces/Icertificado';
import { Icurso } from '../Interfaces/Icurso';
import Ifacultad from '../Interfaces/Ifacultad';
import FacultadesService from '../Services/sFacultades';
import CursosService from '../Services/sCursos';
import CertificadosService from '../Services/sCertificados';

type Props = {
    setCertificados:React.Dispatch<React.SetStateAction<Icertificado[]>>,
    setCursos:React.Dispatch<React.SetStateAction<Icurso[]>>,
    setFacultades:React.Dispatch<React.SetStateAction<Ifacultad[]>>
}

export default function Preloader({setCertificados, setCursos, setFacultades}:Props) 
{
    React.useEffect(()=>{
        CertificadosService.fetchItems(setCertificados)
        CursosService.fetchItems(setCursos)
        FacultadesService.fetchItems(setFacultades)
    },[]);

    return (
        <React.Fragment>
            Preloader
        </React.Fragment>
    )
}
