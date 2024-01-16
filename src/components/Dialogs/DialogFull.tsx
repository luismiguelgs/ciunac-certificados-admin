import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DetalleSolicitud from '../DetalleSolicitud/DetalleSolicitud';
import Icertificado from '../../Interfaces/Icertificado';
import Ifacultad from '../../Interfaces/Ifacultad';
import { Icurso } from '../../Interfaces/Icurso';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    open:boolean,
    title:string,
    id:string | undefined,
    certificados: Icertificado[],
    facultades: Ifacultad[],
    cursos: Icurso[]
}

export default function DialogFull({setOpen,open,title,id, facultades, certificados, cursos}:Props) 
{
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div>
                    <DetalleSolicitud 
                        id={id} 
                        certificados={certificados} 
                        facultades={facultades} cursos={cursos}
                        setOpen={setOpen}
                    />
                </div>
            </Dialog>
        </React.Fragment>
    )
}
