
import React, {Component} from 'react';
//import { makeStyles } from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { get_labels_by_contact, add_contact_label, delete_contact_label } from '../../api/index';

/*const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      margin: theme.spacing(1),
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    }
  }));*/
  
  export default class ContactLabel extends Component{
    constructor(props){
      super(props);
      this.state = {labels: []};
      this.contact_id=this.props.contact_id;
      this.get_labels_by_contact=this.GetLabelsByContact.bind(this);

  }
  componentDidMount() {
    //axios.get('http://localhost:5000/contacts')
    console.log(this.contact_id)
    get_labels_by_contact(this.contact_id)
      .then(response => {
        this.setState({ labels: response.data })
      })
      .then(console.log(this.state.labels, 'labels received'))
      // .catch((error) => {
      //   console.log(error);
      // })
  }

  unassignContactLabel=(label_id, id)=>{
    delete_contact_label(label_id, id)
    .then(response =>{  console.log(response.data)});
    this.setState({
      labels:this.state.labels.filter(el =>el._id !== id)
    })
  }


  GetLabelsByContact=(labels)=>{
     console.log( labels)
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

    console.log('State: ', this.state);

    return(
  <div className ='labelList'>
  {this.GetLabelsByContact(this.state.labels)}
</div>

    );
  }
  } 
