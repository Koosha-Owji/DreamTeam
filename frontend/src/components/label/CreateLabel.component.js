import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { create_label } from '../../api/index';



export default class CreateLabel extends Component {

    constructor(props) {
        super(props);

        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangecolour = this.onChangecolour.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
        title: '',
        colour:'',
        }
      }

      onSubmit(e) {
        e.preventDefault();

        const label = {
          title:this.state.title,
          colour:this.state.colour
        };

        console.log(label);
        create_label(label);

        window.location = '/home';
      }


      onChangetitle(e) {
        this.setState({
          title: e.target.value
        });
      }
      onChangecolour(e) {
        this.setState({
          colour: e.target.value
        });
      }





  render() {
    return (
        <Container component="main" maxWidth="xs">
        <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="title"
                fullWidth
                value = {this.state.title}
                onChange={this.onChangetitle}
            ></TextField>
            <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">Colour</InputLabel>
            <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={this.state.colour}
            onChange={this.onChangecolour}
            >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"#90caf9"} style={{backgroundColor:'#90caf9'}}>Blue</MenuItem>
          <MenuItem value={"#e57373"} style={{backgroundColor:'#e57373'}}>Red</MenuItem>
          <MenuItem value={"#b39ddb"} style={{backgroundColor:'#b39ddb'}}>Purple</MenuItem>
          <MenuItem value={"#fff176"} style={{backgroundColor:'#fff176'}}>Yellow</MenuItem>
          <MenuItem value={"#ff8a65"} style={{backgroundColor:'#ff8a65'}}>Orange</MenuItem>
          <MenuItem value={"#81c784"} style={{backgroundColor:'#81c784'}}>Green</MenuItem>
        </Select>
      </FormControl>


            <div className = 'note_footer'>
                <Button className = "Add label" onClick={this.onSubmit}>Save</Button>
            </div>

      </Container>
    );
  }
} 