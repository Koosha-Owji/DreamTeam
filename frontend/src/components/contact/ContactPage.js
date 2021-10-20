import React from "react";
import ContactList from "./ContactList";
import AddContactButton from "./AddContactButton.component";
import ManageLabelButton from "./../label/ManageLabelsButton.component";
import Grid from "@material-ui/core/Grid";
// import { get_all_contacts} from "../../api/index";
import {get_all_contacts} from "../../actions/contact"
import {get_all_labels} from "../../api/index"
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "material-ui-search-bar";




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


  return (
    <div>
      <div className="contactList" style={{ display: "flex" }}>
        <Grid item xs={3}>
          <AddContactButton new_labels = {new_labels} />
        </Grid>
        <Grid item xs={3}>
          <ManageLabelButton />
        </Grid>

        <SearchBar
          value={searchString}
          onChange={handleSearch}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "0 auto",
            maxWidth: 800,
          }}
        />
        {/* <Grid item xs={3}>
          <FormControl
            fullWidth
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Search by label
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={this.label_id}
              onChange={this.onChangeLabel}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {this.displayLabelDropdown(this.state.labels)}
            </Select>
          </FormControl>
        </Grid> */}
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
