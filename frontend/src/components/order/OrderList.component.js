import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
//import AddOrder from './AddOrder.component';
import DeleteOrder from './DeleteOrder.component';
import UpdateOrderStatus from './UpdateOrderStatus.component';
import { get_all_orders, delete_order } from '../../api/index';
import OrderContact from './OrderContact.component';

export default class OrderList extends Component{
constructor(props){
    super(props);
    this.state = {
      orders: []
    };
    this.delete_order = this.deleteOrder.bind(this);

}

componentDidMount() {
    get_all_orders()
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }
componentDidUpdate(prevProps, prevState){
    if(this.state.orders!==prevState.orders){
      get_all_orders()
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }

  deleteOrder=(id)=>{
    delete_order(id)
    .then(response =>{  console.log(response.data)});

  }
    

  displayOrders=(orders)=>{
    if(!orders.length) return null;

    return orders.map((order, index)=>(
      <div key = {index} className ='orderListItem' style={{padding:'10px'}}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header">
            <Grid item xs={3}>
                <OrderContact contact_id={order.contact_id}/>
            </Grid>
            <Grid item xs={3}>
                <Typography className='dueDate' style={{textAlign:'left'}}>Due {order.due_date}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className='status' style={{textAlign:'left'}}>Status: {order.stage}</Typography>
              
            </Grid>
            <Grid item xs={1} >
              <UpdateOrderStatus currId ={order._id} allOrders={orders} />
              </Grid>
             <Grid item xs={1}>
                <DeleteOrder id={order._id} deleteOrder={this.deleteOrder}/>
              </Grid>
              </AccordionSummary>
              <AccordionDetails className='orderExpand'> 
              <Grid item xs={3}>
              <Typography className='dateOrdered' style={{textAlign:'left'}}>Date ordered: {order.order_date}</Typography>
              </Grid>
              <Grid item xs={3}>
              <Typography className='amount' style={{textAlign:'left'}}>Amount: {order.amount}</Typography>
              </Grid>
              <Grid item xs={3}>
              <Typography className='product' style={{textAlign:'left'}}>Product: {order.product}</Typography>
              </Grid>
        
        
              </AccordionDetails>
              </Accordion>

      </div>
    ));

  }

  render(){

      console.log('State: ', this.state);

      return(
    <div className ='orderList'>
    {this.displayOrders(this.state.orders)}
  </div>

      );
    }
} 