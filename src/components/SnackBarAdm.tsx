import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

type Props = {
    content:string,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}

export default function SnackBarAdm({content, open, setOpen}:Props) 
{
    const handleClose = (/*event?: React.SyntheticEvent | Event*/) => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {content}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
