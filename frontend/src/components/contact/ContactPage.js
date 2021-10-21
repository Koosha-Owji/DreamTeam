import React from "react";
import ContactList from "./ContactList";
import AddContactButton from "./AddContactButton.component";
import ManageLabels from "./../label/ManageLabelsButton.component";
import Grid from "@material-ui/core/Grid";
import {get_all_contacts} from "../../actions/contact"
import {get_all_labels,  delete_label, create_label} from "../../actions/label"
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "material-ui-search-bar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


var contactsList = [];
const ContactPage = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contact);
    React.useEffect(() => {
      dispatch(get_all_contacts());
    }, [dispatch]);

    var labels = useSelector((state)=>state.label)

    React.useEffect(()=>{
      dispatch(get_all_labels());
    }, [dispatch])
    const finaliseDelete=(id)=>{
      dispatch(delete_label(id));
      
    }
    const finaliseCreate=(label)=>{
      dispatch(create_label(label));
    }

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
      console.log(search)
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
              if(i.labels[t].value._id.match(labelFilter)){
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
              Filter by label
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
        <Grid item xs={3}>
          <AddContactButton labels = {labels} />
        </Grid>
        <Grid item xs={3}>
          <ManageLabels labels={labels} finaliseDelete={finaliseDelete} finaliseCreate={finaliseCreate} />
        </Grid>
        
      </div>
      <ContactList contacts={contactsList} labels = {labels} />
    </div>
  );
};

export default ContactPage;
