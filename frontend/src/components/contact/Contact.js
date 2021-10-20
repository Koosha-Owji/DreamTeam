import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import DeleteContact from "./DeleteContact.component";
import SendContactEmail from "./SendContactEmail.component";
import Update from "./UpdateContact.component";
import ContactLabel from "./ContactLabel"
import { delete_contact_label } from "../../actions/contact";
import { useDispatch } from "react-redux";


const Contact = ({contacts, contact, new_labels}) => {
  const dispatch = useDispatch();

  const handleDeleteLabel = (id) => {
        contact.labels = contact.labels.filter((el) => el.value !== id);
        dispatch(delete_contact_label(contact.labels, contact._id))
    }

  return (
    <div className="contactListItem" style={{ padding: "10px" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <Grid item xs={3}>
            <Typography className="first_name" style={{ textAlign: "left" }}>
              {contact.first_name} {contact.last_name}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="business" style={{ textAlign: "left" }}>
              {contact.business}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {/* <ContactLabel contact_id={contact._id} /> */}
            <ContactLabel
              labels={contact.labels}
              contact_id={contact._id}
              handleDeleteLabel = {handleDeleteLabel}
            />
          </Grid>

          <Grid item xs={1}>
            <SendContactEmail />
          </Grid>
          <Grid item xs={1} textA>
            <Update
              currId={contact._id}
              allContacts={contacts}
              new_labels={new_labels}
            />
          </Grid>
          <Grid item xs={1}>
            <DeleteContact id={contact._id} />
          </Grid>
        </AccordionSummary>

        <AccordionDetails
          className="contactExpand"
          style={{ display: "block" }}
        >
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>
            <Typography className="email_address" style={{ textAlign: "left" }}>
              Email {contact.email_address}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="phone_number" style={{ textAlign: "left" }}>
              Phone Number {contact.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="relationship" style={{ textAlign: "left" }}>
              Relationship {contact.relationship}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className="description" style={{ textAlign: "left" }}>
              Description {contact.description}
            </Typography>
          </Grid>
        </AccordionDetails>
        <Divider />
      </Accordion>
    </div>
  );
};

export default Contact;
