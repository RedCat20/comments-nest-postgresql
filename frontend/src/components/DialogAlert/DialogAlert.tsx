import {ReactNode} from 'react';
import {Button, Dialog, DialogTitle} from '@mui/material';
import {FC} from "react";

interface Props {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
    children: ReactNode;
}

const DialogAlert:FC<Props> = ({open, setOpen,children}) => {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{position: 'absolute', right: '0'}}>
                    <Button color="secondary" variant="contained" onClick={handleClose}>X</Button>
                </DialogTitle>

                {children}

            </Dialog>

    );
}

export default DialogAlert;