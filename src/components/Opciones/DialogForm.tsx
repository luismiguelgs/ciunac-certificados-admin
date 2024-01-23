import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';


type Props = {
    certificado?:boolean,
    item:any,
    setItem:React.Dispatch<React.SetStateAction<any>>,
    opt:string,
    contentText?:string,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    actionFunc(arg?:any):void
}

export default function DialogForm({certificado=false, item, setItem, opt, contentText='', open, setOpen, actionFunc}:Props) 
{
    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData:any)=>({...prevFormData, [name]:value}))
    }

    return (
        <React.Fragment>
            <Dialog open={open} onClose={()=>setOpen(false)}>
                <DialogTitle>{opt==='NUEVO' ? 'Nuevo Item' : 'Editar Item'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{contentText}</DialogContentText>
                    {
                        opt === 'NUEVO' ? (
                            <TextField
                                autoFocus
                                value={item.value}
                                margin="dense"
                                name="value"
                                label="Valor"
                                onChange={(e)=>handleChange(e)}
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        ) : null
                    }
                    <TextField
                        margin="dense"
                        name="label"
                        value={item.label}
                        label="Etiqueta"
                        onChange={(e)=>handleChange(e)}
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    {certificado && <TextField
                        margin="dense"
                        name="precio"
                        value={item?.precio}
                        label="Precio"
                        onChange={(e)=>handleChange(e)}
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    }   
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)}>Cancelar</Button>
                    <Button onClick={actionFunc}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
