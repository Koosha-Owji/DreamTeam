
/**
 *  OrderList.component.js, iists all order, can update, delete and add orders from this component
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React, {Component} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import AddOrderButton from './AddOrderButton.component';
import DeleteOrder from './DeleteOrder.component';
import UpdateOrderStatus from './UpdateOrderStatus.component';
import { get_all_orders, delete_order } from '../../api/index';



export default class OrderList extends Component{
constructor(props){
    super(props);
    this.state = {
      orders: []
    };
    this.delete_order = this.deleteOrder.bind(this);
    this.updateView=this.updateView.bind(this);
    this.updateView2=this.updateView2.bind(this);

}

/**Keep rendered orders current */
componentDidMount() {
    get_all_orders()
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

/** This function is passed to child component AddOrder so that the addOrderdialogue can be closed
 * and new order returned here upon pushing to db*/ 
  updateView =(newOrder)=>{
    let a = this.state.orders.slice();
    a.push(newOrder)
    this.setState((state) => {
      return {orders: a}
    });
    this.componentDidMount();
  }
  /**This function is passed to child component UpdateOrderStatus so that when a order is updated
 * we get fresh odrers from the db and render them
 */
  updateView2=()=>{
    this.componentDidMount();
  }

  /**Delete contact by given id and update state
 */
  deleteOrder=(id)=>{
    delete_order(id)

    
    this.setState({
      orders:this.state.orders.filter(el =>el._id !== id)
    })
    

  }

  getDate1 = (date) =>{
    if(date){
    var date_time = new Date(date);
    return date_time.toDateString();
    }else{
      return ""
    }
  }
    
/**Map all current orders into accordian display */
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
            <Typography className='contact' style={{textAlign:'left'}}>Contact: {order.contact_id}</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography className='dueDate' style={{textAlign:'left'}}>Due: {this.getDate1(order.due_date)}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className='status' style={{textAlign:'left'}}>Status: {order.stage}</Typography>
              
            </Grid>
            <Grid item xs={1} >
              <UpdateOrderStatus currId ={order._id} allOrders={orders} updateView={this.updateView2} />
              </Grid>
             <Grid item xs={1}>
                <DeleteOrder id={order._id} deleteOrder={this.deleteOrder}/>
              </Grid>
              </AccordionSummary>
              <AccordionDetails className='orderExpand'> 
              <Grid item xs={3}>
              <Typography className='dateOrdered' style={{textAlign:'left'}}>Date ordered: {this.getDate1(order.order_date)}</Typography>
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

      return(
        <div>
    <div className ='orderList'>
    <Grid item xs={3}>
      <AddOrderButton updateView ={this.updateView}/> 
      </Grid>
    </div>
    {this.displayOrders(this.state.orders)}
  </div>

      );
    }
} 