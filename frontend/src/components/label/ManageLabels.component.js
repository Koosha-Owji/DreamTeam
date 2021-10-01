import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import {get_all_labels, delete_label} from '../../api/index';
import CreateLabelButtonPage from './CreateLabelButton.component';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

export default class ManageLabels extends Component{
constructor(props){
    super(props);
    this.state = {labels: []};
    this.delete_contact = this.deleteLabel.bind(this)

}

componentDidMount() {
    //axios.get('http://localhost:5000/labels')
    get_all_labels()
      .then(response => {
        this.setState({ labels: response.data })
      })
      .then(console.log('labels received'))
      .catch((error) => {
        console.log(error);
      })
  }

  deleteLabel=(id)=>{
    //axios.post('http://localhost:5000/labels/delete/'+id)
    delete_label(id)
    .then(response =>{  console.log(response.data)});

    this.setState({
      labels:this.state.labels.filter(el =>el._id !== id)
    })
  }


  displayLabels=(labels)=>{
    if(!labels.length) return null;

    return labels.map((label, index)=>(
      <div key = {index} className ='labelListItem' style={{padding:'10px'}}>
        <Box sx={{ flexGrow: 1, width:'100%'}} >

        <Grid container spacing={2}>
          <Grid item xs={10} style ={{backgroundColor:`${label.colour}`, borderRadius:'10px'}}>
          <Typography className='title' variant='h6' style={{textAlign:'left'}}>{label.title}</Typography>
        </Grid>
      <Grid item xs={2}>
      <Fab color="primary" aria-label="delete"  onClick={()=>this.deleteLabel(label._id)} style={{display:'inlineFlex'}}>
            <DeleteIcon/>
      </Fab>
      </Grid>
      </Grid>
      </Box>
      </div>
    ));

  }
  render(){

      console.log('State: ', this.state);

      return(
    <div className ='labelList' style={{padding:'10px'}}>
      {this.displayLabels(this.state.labels)}
      <CreateLabelButtonPage/>

  </div>

      );
    }
} 