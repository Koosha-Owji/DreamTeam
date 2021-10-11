
import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { get_labels_by_contact, delete_contact_label } from '../../api/index';
import AddContactLabel from '../label/AddContactLabel.component';
  
  export default class ContactLabel extends Component{
    constructor(props){
      super(props);
      this.state = {labels: []};
      this.contact_id=this.props.contact_id;
      this.get_labels_by_contact=this.GetLabelsByContact.bind(this);
      this.updateView=this.props.updateView;

  }
  componentDidMount() {
    get_labels_by_contact(this.contact_id)
      .then(response => {
        this.setState({ labels: response.data })
      })
  }

  unassignContactLabel=(label_id, id)=>{
    delete_contact_label(label_id, id)
    this.setState({
      labels:this.state.labels.filter(el =>el._id !== id)
    })
    this.componentDidMount();
  }

  updateView2=()=>{
    console.log("updating")
    this.componentDidMount();
  }

  GetLabelsByContact=(labels)=>{
      return labels.map((item,index)=>(
        // <Grid item xs={5}>
        <div key = {index} className ='labelListItem' style={{padding:'10px'}}>
          <Chip label={item.title} color={item.colour} variant="outlined" style ={{backgroundColor:`${item.colour}`}} 
            onDelete={() => this.unassignContactLabel(item._id, this.contact_id)}/>
        </div>
        /* </Grid> */
      )
      )
  }
  render(){


    return(
      <div style={{display:"flex"}}>
        
       
    <Grid item xs={5}>
            <AddContactLabel contact_id={this.contact_id} updateView={this.updateView2} />
    </Grid>
    <Grid item xs={5}>
    {this.GetLabelsByContact(this.state.labels)}
    </Grid>
  </div>

    );
  }
  } 
