import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Test from './Pages/Test'
import Solicitudes from './Pages/Solicitudes'
import DetalleSolicitudes from './Pages/DetalleSolicitudes'
import Opciones from './Pages/Opciones'
import Preloader from './components/Preloader'
import React from 'react'
import Icertificado from './Interfaces/Icertificado'
import Certificados from './Pages/Certificados'
import Reportes from './Pages/Reportes'
import { Icurso } from './Interfaces/Icurso'
import Ifacultad from './Interfaces/Ifacultad'
import NuevaSolicitud from './Pages/NuevaSolicitud'
import Mantenimineto from './Pages/Mantenimineto'

function App() 
{
  const [certificados, setCertificados] = React.useState<Icertificado[]>([]);
  const [cursos, setCursos] = React.useState<Icurso[]>([]);
  const [facultades, setFacultades] = React.useState<Ifacultad[]>([])
  
  return (
    <>
      <Preloader setCertificados={setCertificados} setCursos={setCursos} setFacultades={setFacultades}/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<Test/>} />
          <Route path='certificados' element={<Certificados />} />
          <Route path='reportes' element={<Reportes />} />
          <Route path='solicitudes' element={<Solicitudes/>} />
          <Route 
            path='solicitudes/:id'
            element={<DetalleSolicitudes certificados={certificados} facultades={facultades} cursos={cursos}/>} />
          <Route 
            path='opciones' 
            element={<Opciones certificados={certificados} cursos={cursos} facultades={facultades}/>} />
          <Route path='solicitud-nueva' element={<NuevaSolicitud />} />
          <Route path='mantenimiento' element={<Mantenimineto />} />
				</Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
