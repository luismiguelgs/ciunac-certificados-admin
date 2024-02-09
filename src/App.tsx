import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './Pages/Dashboard'
import Solicitudes from './components/Mantenimiento/Solicitudes'
import DetalleSolicitudes from './Pages/DetalleSolicitudes'
import Opciones from './Pages/Opciones'
import Preloader from './components/Preloader'
import Certificados from './Pages/Certificados'
import Reportes from './Pages/Reportes'
import NuevaSolicitud from './Pages/NuevaSolicitud'
import Mantenimineto from './Pages/Mantenimineto'

function App() 
{
  
  return (
    <>
      <Preloader />
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}> 
          <Route index element={<Dashboard/>} />
          <Route path='certificados' element={<Certificados />} />
          <Route path='reportes' element={<Reportes />} />
          <Route path='solicitudes' element={<Solicitudes/>} />
          <Route 
            path='solicitudes/:id'
            element={<DetalleSolicitudes />} />
          <Route 
            path='opciones' 
            element={<Opciones />} />
          <Route 
            path='solicitud-nueva' 
            element={<NuevaSolicitud />} />
          <Route path='mantenimiento' element={<Mantenimineto />} />
				</Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
