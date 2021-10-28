/**
 * ContactLabel.component.js, contact's labels are displayed in vertical list of chips
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React from "react";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";


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
                  color={label.colour}
                  variant="outlined"
                  style={{ backgroundColor: `${label.value.colour}` }}
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
