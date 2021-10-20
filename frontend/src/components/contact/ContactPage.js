import React from "react";
import ContactList from "./ContactList";
import AddContactButton from "./AddContactButton.component";
import ManageLabelButton from "./../label/ManageLabelsButton.component";
import Grid from "@material-ui/core/Grid";
import {get_all_contacts} from "../../actions/contact"
import {get_all_labels} from "../../api/index"
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "material-ui-search-bar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


var contactsList = [];
var new_labels = []
const ContactPage = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contact);
    React.useEffect(() => {
      dispatch(get_all_contacts());
    }, [dispatch]);

    
    var flag = true;
    const [labels, setLabels] = React.useState([]);
    React.useEffect(() => {
      const handleContacts = () => {
        get_all_labels()
          .then((response) => {
            if (response.data) {
              setLabels(response.data);
            } else {
              console.log("No Contacts");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      handleContacts();
    }, [flag]);

    const fixLabels = () => {
      labels.map((label) => {
        if (new_labels.length < labels.length) {
          new_labels.push({
            label: label.title,
            value: label._id,
            color: label.colour
          });
        }
        return null;
      });
    };
    fixLabels();
    const [searchString, setSearchString] = React.useState("");

    const handleSearch = (e) => {
      if (e) {
        setSearchString(e.trim().toLowerCase());
        searchFunc(searchString);
      } else {
        setSearchString(e);
        contactsList = contacts;
      }
    };

    const searchFunc = (search) => {
      if (search.length > 0) {
        contactsList = contacts.filter(function (i) {
          try {
            return (
              i.first_name.toLowerCase().match(search) ||
              i.last_name.toLowerCase().match(search)
            );
          } catch (e) {
            contactsList = contacts;
            return contactsList;
          }
        });
      } else {
        contactsList = contacts;
      }
    };

    searchFunc(searchString);

    const [filterLabel, setFilterLabel]=React.useState("");

    const handleFilter = (e) =>{
      if(e){
        setFilterLabel(e.target.value);
        filterFunc(filterLabel);
      }else{
        setFilterLabel(e);
        contactsList=contacts;
      }
    };

    const filterFunc = (labelFilter)=>{
      if(labelFilter!==""){
        contactsList=contacts.filter(function(i){
          try {
            for(let t=0; t<i.labels.length; t++){
              if(i.labels[t].value.match(labelFilter)){
                return true;
              }
            }
            return false;
          } catch (e) {
            contactsList = contacts;
            return contactsList;
          }
        }
        )
      }else{
        contactsList=contacts;
      }
    }

    filterFunc(filterLabel);

    

       /**Display labels in a dropdown from which we can select one to assign to a contact */

   const displayLabelDropdown=(labels)=>{
    if(!labels.length) return null;
      return labels.map((label, index)=>(
        <MenuItem value={label._id} style={{backgroundColor:`${label.colour}`}}>{label.title}</MenuItem>

      ))
  }
    

  return (
    <div>
      <div className="contactList" style={{ display: "flex" }}>
        <Grid item xs={3}>
          <AddContactButton new_labels = {new_labels} />
        </Grid>
        <Grid item xs={3}>
          <ManageLabelButton />
        </Grid>
        <Grid item xs={3} style={{padding:"10px"}}>
        <SearchBar
          value={searchString}
          onChange={handleSearch}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        />
        </Grid>
        <Grid item xs={3}>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{ minWidth:120, margin:"0" }}
          >
            <InputLabel id="demo-simple-select-filled-label" >
              Search by label
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              label="filter by label"
              value={filterLabel}
              onChange={handleFilter}
            >
              <MenuItem value="none">
                <em>None</em>
              </MenuItem>
              {displayLabelDropdown(labels)}
            </Select>
          </FormControl>
        </Grid>
      </div>
      {/* <input
        type="text"
        className="input"
        // onChange={this.handleChange}
        placeholder="Search by first name"
      /> */}
      <ContactList contacts={contactsList} new_labels = {new_labels} />
    </div>
  );
};

export default ContactPage;
