/**
 * updateorder.component.js, component for updating a order
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
 import Fab from '@material-ui/core/Fab';
 import React from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import UpdateIcon from '@material-ui/icons/Update';
 import Dialog from '@material-ui/core/Dialog';
 import DialogTitle from '@material-ui/core/DialogTitle';
 import Select from '@material-ui/core/Select';
 import InputLabel from '@material-ui/core/InputLabel';
 import MenuItem from '@material-ui/core/MenuItem';
 import FormControl from '@material-ui/core/FormControl';
 import TextField from '@material-ui/core/TextField';
 import Button from '@material-ui/core/Button';
 import Container from '@material-ui/core/Container';
 
 import { Typography } from '@material-ui/core';
 import { useState, useEffect } from 'react';
 import {useDispatch, useSelector} from 'react-redux';
 import { update_order } from '../../actions/order';
 
 
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
   
   
    const  UpdateOrderStatus=({currId, allOrders})=> {
     const classes = useStyles();
 
     
     const dispatch = useDispatch();
 
     const [orderDetails, setOrderDetails]=useState({
        contact_id:'',
        product:'',
        stage:'',
        amount:'',
        dueDate:'',
        startDate:'',
        count:''
     });
 
     const order = useSelector((state) => currId ? allOrders.find((n) => n._id === currId) : null);
 
     const [open, setOpen] = React.useState(false);
 
     useEffect(() => {
         if (order){
         setOrderDetails(orderDetails=>({
             ...orderDetails,
             product:order.product,
             amount :order.amount,
             stage :order.stage,
             due_date :order.due_date,
             order_ate:order.start_date
         }));
         }
     }, [currId,order,orderDetails.count])
 
     const handleSaveClick = (event) => {
       console.log(orderDetails);
       if (orderDetails){
           
         dispatch (update_order(currId, orderDetails))
         window.location.reload(true);
         handleClose();
       }
 
     }
     
 
   
     const handleClickOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
 
   
     return (
       <div className={classes.root}>
             <div className = {classes.deleteorder}>
                 <div className ='updateorder'>
                 <Fab color="primary" aria-label="update"  onClick={handleClickOpen}style={{display:'flex'}} >
                   <UpdateIcon/>
                 </Fab>
                 <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                   <DialogTitle id="form-dialog-title">Update order</DialogTitle>
                   <Container component="main" maxWidth="xs">
                   <Typography variant="caption"> Due Date</Typography>
         <TextField
                 autoFocus
                 margin="dense"
                 id="name"
                 type="date"
                 fullWidth
                 value = {orderDetails.due_date}
                 onChange={(e) => setOrderDetails({...orderDetails, due_date:e.target.value})}
             ></TextField>
             <Typography variant="caption"> Start Date</Typography>
             <TextField
                 autoFocus
                 margin="dense"
                 id="name"
                 type="date"
                 fullWidth
                 value = {orderDetails.start_date}
                 onChange={(e) => setOrderDetails({...orderDetails, start_date:e.target.value})}
             ></TextField>
              <TextField
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Amount"
                 type="amount"
                 fullWidth
                 value = {orderDetails.amount}
                 onChange={(e) => setOrderDetails({...orderDetails, amount:e.target.value})}
             ></TextField>
              <TextField
                 autoFocus
                 margin="dense"
                 id="name"
                 label="Product"
                 type="product"
                 fullWidth
                 value = {orderDetails.product}
                 onChange={(e) => setOrderDetails({...orderDetails, product:e.target.value})}
             ></TextField>
             <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Order Status</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={orderDetails.stage}
            onChange={(e) => setOrderDetails({...orderDetails, stage:e.target.value})}
            >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Ordered"} >Ordered</MenuItem>
          <MenuItem value={"Delivered"} >Delivered</MenuItem>
          <MenuItem value={"Completed"} >Completed</MenuItem>
                </Select>
             </FormControl>
             <div className = 'note_footer'>
                 <Button className = "Add to orders" onClick={handleSaveClick}>Save changes</Button>
             </div>
       </Container>
                   
                 </Dialog>
                 </div>
 
                 </div>
             </div>
                 
   );
 };
 
 export default UpdateOrderStatus