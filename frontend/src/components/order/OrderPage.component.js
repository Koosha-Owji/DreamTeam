import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import AddOrder from './AddOrder.component';
import DeleteOrder from './DeleteOrder.component';
import UpdateOrderStatus from './UpdateOrderStatus.component';
import { get_all_orders, delete_order,  } from '../../api/index';

export default class OrderPage extends Component{
constructor(props){
    super(props);
    this.state = {orders: []};
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

  deleteOrder=(id)=>{
    delete_order(id)
    .then(response =>{  console.log(response.data)});

    this.setState({
      orders:this.state.orders.filter(el =>el._id !== id)
    })
  }

  displayOrders=(orders)=>{
    if(!orders.length) return null;

    return orders.map((order, index)=>(
      <div key = {index} className ='orderListItem' style={{padding:'10px'}}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
      <Grid item xs={6}>
      <Typography className='dateOrdered' style={{textAlign:'left'}}>Date ordered: {order.date}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography className='client' style={{textAlign:'left'}}>{order.contact}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography className='status' style={{textAlign:'left'}}>Status;{order.status}</Typography>
        </Grid>
        <Grid item xs={1} textA>
        <UpdateOrderStatus currId ={order._id} allOrders={this.state.orders}/>
        </Grid>
        <Grid item xs={1}>
        <DeleteOrder id={order._id} deleteOrder={this.delete_order}/>
        </Grid>
        </AccordionSummary>


        <AccordionDetails className='orderExpand'style={{display:'block'}}> 
        <Typography className='email_address' style={{textAlign:'left'}}>More details to go here {order.business}</Typography>
        </AccordionDetails>
        <Divider />
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