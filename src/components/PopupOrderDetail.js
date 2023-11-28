import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import OrderDetails from './OrderDetails';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupOrderDetail(props) {
 

  const handleClickOpen = () => {
    props?.setOpen(true);
  };

  const handleClose = () => {
    props?.setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Order details"}</DialogTitle>
        <DialogContent>
          <OrderDetails order={props?.order} />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
            props?.setOpen(false);
          }}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
