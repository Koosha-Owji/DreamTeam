/**
 * DeleteOrder.component.js, component for deleting a order
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import Fab from '@material-ui/core/Fab';
 import Dialog from '@material-ui/core/Dialog';
 import DialogActions from '@material-ui/core/DialogActions';
 import DialogTitle from '@material-ui/core/DialogTitle';
 import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';
 import DeleteIcon from '@material-ui/icons/Delete';
 
 const useStyles = makeStyles((theme) => ({
     root: {
       width: '100%',
       margin: theme.spacing(1),
     },
     icon: {
       verticalAlign: 'bottom',
       height: 20,
       width: 20,
     }
   }));
   
   
   export default function DeleteOrder({id, deleteOrder}) {
     const classes = useStyles();
 
   
     const [open, setOpen] = React.useState(false);
   
     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
 
     /**Function to send delete order request to back end and close dialogue */
     function finaliseDelete(id){
       deleteOrder(id);
       handleClose();
     }
     return (
         <div className={classes.root}>
             <div className = {classes.deleteContact}>
                 <Fab color="primary" aria-label="delete"  onClick={handleClickOpen} style={{display:'flex'}}>
                     <DeleteIcon/>
                 </Fab>
                 <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Are you sure you want to remove this order?</DialogTitle>
             <DialogActions>
               <Button onClick= {()=>finaliseDelete(id)} color="primary">
                 Delete
               </Button>
               <Button onClick={handleClose} color="primary">
                 Cancel
               </Button>
             </DialogActions>
             
           </Dialog>
             </div>
             </div>
   );
 }