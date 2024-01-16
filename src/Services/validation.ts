import { IsolicitudVal } from "../Interfaces/IsolicitudVal";
import { Isolicitud } from "../Interfaces/Isolicitud";


export function valNuevaSolicitud(data:Isolicitud,setVal:React.Dispatch<React.SetStateAction<IsolicitudVal>>){
    let solicitud:boolean
    let nombres:boolean    
    let apellidos:boolean
    let dni:boolean
    let celular:boolean
    let idioma:boolean
    let nivel:boolean
    let codigo: boolean
    

    if(data.solicitud === ''){
        solicitud = false
        setVal((prevBasicVal)=>({...prevBasicVal, solicitud:true}))
    }else{
        solicitud = true
        setVal((prevBasicVal)=>({...prevBasicVal, solicitud:false}))
    }
    
    if(data.nombres === ''){
        nombres = false
        setVal((prevBasicVal)=>({...prevBasicVal, nombres:true}))
    }else{
        nombres = true
        setVal((prevBasicVal)=>({...prevBasicVal, nombres:false}))
    }

    if(data.apellidos === ''){
        apellidos = false
        setVal((prevBasicVal)=>({...prevBasicVal, apellidos:true}))
    }else{
        apellidos = true
        setVal((prevBasicVal)=>({...prevBasicVal, apellidos:false}))
    }
    if(data.dni === '' || data.dni.length < 8){
        dni = false
        setVal((prevBasicVal)=>({...prevBasicVal, dni:true}))
    }else{
        dni = true
        setVal((prevBasicVal)=>({...prevBasicVal, dni:false}))
    }
    if(data.celular === '' || data.celular.length < 9){
        celular = false
        setVal((prevBasicVal)=>({...prevBasicVal, celular:true}))
    }else{
        celular = true
        setVal((prevBasicVal)=>({...prevBasicVal, celular:false}))
    }
    if(data.idioma === ''){
        idioma = false
        setVal((prevBasicVal)=>({...prevBasicVal, idioma:true}))
    }else{
        idioma = true
        setVal((prevBasicVal)=>({...prevBasicVal, idioma:false}))
    }
    if(data.nivel === ''){
        nivel = false
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:true}))
    }else{
        nivel = true
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:false}))
    }
    if(data.nivel === ''){
        nivel = false
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:true}))
    }else{
        nivel = true
        setVal((prevBasicVal)=>({...prevBasicVal, nivel:false}))
    }
    //validar datos si no es trabajador (numero_voucher, pago, fecha_pago)
    if(!data.trabajador){
        let voucher: boolean
        let fecha: boolean
        let pago: boolean
        if(data.numero_voucher === ''){
            voucher = false
            setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:true}))
        }else{
            voucher = true
            setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:false}))
        }
        if(data.fecha_pago === ''){
            fecha = false
            setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:true}))
        }else{
            fecha = true
            setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:false}))
        }
        if(data.pago === '0' || data.pago === ''){
            pago = false
            setVal((prevBasicVal)=>({...prevBasicVal, pago:true}))
        }else{
            pago = true
            setVal((prevBasicVal)=>({...prevBasicVal, pago:false}))
        }
        return solicitud && nombres && apellidos && dni && celular && idioma && nivel && pago && fecha && voucher

    }else{
        setVal((prevBasicVal)=>({...prevBasicVal, pago:false}))
        setVal((prevBasicVal)=>({...prevBasicVal, fecha_pago:false}))
        setVal((prevBasicVal)=>({...prevBasicVal, numero_voucher:false}))
    }
    //validar codigo en caso facultad no sea particular
    if(data.facultad !== 'PAR'){
        if(data.codigo === ''){
            codigo = false
            setVal((prevBasicVal)=>({...prevBasicVal, codigo:true}))
        }else{
            codigo = true
            setVal((prevBasicVal)=>({...prevBasicVal, codigo:false}))
        }
        return solicitud && nombres && apellidos && dni && celular && idioma && nivel && codigo
    }
    
    return solicitud && nombres && apellidos && dni && celular && idioma && nivel
}
export function valEditarSolicitud(item:Isolicitud)
{
    if(item.manual === true){
        if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') ||
        (item.apellidos==='') || (item.celular==='')  || (item.numero_voucher==='') ||
        (item.fecha_pago==='')){
            return false
        }
            return true
    }else{
        if((item.estado===undefined || item.estado==='') || (item.dni==='') || (item.nombres==='') ||
        (item.apellidos==='') || (item.celular==='') || (item.email==='') || (item.numero_voucher==='') ||
        (item.fecha_pago==='')){
            return false
        }
            return true
    }
}