
import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { get_labels_by_contact, delete_contact_label } from '../../api/index';

  
  export default class ContactLabel extends Component{
    constructor(props){
      super(props);
      this.state = {labels: []};
      this.contact_id=this.props.contact_id;
      this.get_labels_by_contact=this.GetLabelsByContact.bind(this);

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
    window.location = '/home';
  }


  GetLabelsByContact=(labels)=>{
      return labels.map((item,index)=>(
        <Grid>
        <div key = {index} className ='labelListItem' style={{padding:'10px'}}>
          <Chip label={item.title} color={item.colour} variant="outlined" style ={{backgroundColor:`${item.colour}`}} 
            onDelete={() => this.unassignContactLabel(item._id, this.contact_id)}/>
        </div>
        </Grid>
      )
      )
  }
  render(){


    return(
  <div className ='labelList'>
  {this.GetLabelsByContact(this.state.labels)}
</div>

    );
  }
  } 
