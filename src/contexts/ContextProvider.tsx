import React from "react";
import { Icertificado, Icurso, Ifacultad, ITexto } from "../Interfaces/Types";

type ContextValue = {
    certificados:Icertificado[],
    setCertificados: React.Dispatch<React.SetStateAction<Icertificado[]>>,
    textos: ITexto[],
    setTextos: React.Dispatch<React.SetStateAction<ITexto[]>>,
    facultades: Ifacultad[],
    setFacultades: React.Dispatch<React.SetStateAction<Ifacultad[]>>,
    cursos: Icurso[],
    setCursos: React.Dispatch<React.SetStateAction<Icurso[]>>,
}

const StateContext = React.createContext<ContextValue | undefined>(undefined)

export const ContextProvider = ({children}:React.PropsWithChildren<{}>) => {
    const [certificados, setCertificados] = React.useState<Icertificado[]>([]);
    const [textos, setTextos] = React.useState<ITexto[]>([])
    const [facultades, setFacultades] = React.useState<Ifacultad[]>([])
    const [cursos, setCursos] = React.useState<Icurso[]>([])
    
    const contextValue: ContextValue = {
        //handleClick,
        certificados,
        setCertificados,
        textos,
        setTextos,
        facultades,
        setFacultades,
        cursos,
        setCursos,
    }

    return(
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = ():ContextValue => {
    const context = React.useContext(StateContext)

    if(!context){
        throw new Error("useStateContext muy be uded within a ContextProvidewr")
    }
    return context;
}