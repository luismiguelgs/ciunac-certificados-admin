import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Icurso } from '../../Interfaces/Icurso';

type Props = {
    item:Icurso
    setItem:React.Dispatch<React.SetStateAction<Icurso>>
    title:string,
    content:string,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    actionFunc(arg?:any):void
}


export default function DialogCurso({item, setItem, title, content, open, setOpen, actionFunc}:Props) 
{
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const {name, value} = event.target
        setItem((prevFormData)=>({...prevFormData, [name]:value}))
    }

    return (
        <React.Fragment>  
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
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
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={actionFunc}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
