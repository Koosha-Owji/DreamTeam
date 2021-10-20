import React from "react";
// import AddContactLabel from "../label/AddContactLabel.component";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
// import { delete_contact_label } from "../../api/index";


const ContactLabel = ({ labels, contact_id, handleDeleteLabel }) => {
  return (
    <div style={{ display: "flex" }}>
      <Grid item xs={5}>
        {!Array.isArray(labels) ? (
          ""
        ) : (
          <div>
            {labels.map((label) => (
              <div className="labelListItem" style={{ padding: "10px" }}>
                <Chip
                  label={label.label}
                  color={label.color}
                  variant="outlined"
                  style={{ backgroundColor: `${label.color}` }}
                  onDelete={() => handleDeleteLabel(label.value)}
                />
              </div>
            ))}
          </div>
        )}
      </Grid>
    </div>
  );
}

export default ContactLabel;
