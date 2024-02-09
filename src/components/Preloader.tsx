import React from 'react'
import FacultadesService from '../Services/sFacultades';
import CursosService from '../Services/sCursos';
import CertificadosService from '../Services/sCertificados';
import { useStateContext } from '../contexts/ContextProvider';

export default function Preloader() 
{
    const {setCertificados, setCursos, setFacultades} = useStateContext()

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
