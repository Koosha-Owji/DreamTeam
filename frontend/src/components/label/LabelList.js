/**
 * NoteList.js, takes labels component and the required fucntions from the NotePages, and sends individual
 * note attributes to the note.js file
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

 import React from 'react';
 import Fab from '@material-ui/core/Fab';
 import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
 /**
  * For every note in labels list, create a new Note component with the available attributes 
  * and passing it with all the required functionalities
  * @param {a list of labels retrieved from the database} labels 
  * @param {a function that handles when the labels click the delete button} handleDeleteNote
  * @returns {a list of Note components to be rendered} 
  */
 const LabelList = ({ labels, handleDeleteLabel }) => {
   return !Array.isArray(labels) ? (
     <tr>You have no labels! </tr>
   ) : (
     <div className="labelList">
       {labels.map((label) => (
         <Box sx={{ flexGrow: 1, width:'100%', padding:"20px"}} >
  
         <Grid container spacing={2}>
           <Grid item xs={10} style ={{backgroundColor:`${label.colour}`, blabelRadius:'10px'}}>
           <Typography className='title' variant='h6' style={{textAlign:'left'}}>{label.title}</Typography>
         </Grid>
       <Grid item xs={2}>
       <Fab color="primary" aria-label="delete"  onClick={()=>handleDeleteLabel(label._id)} style={{display:'inlineFlex', padding:"10px"}}>
             <DeleteIcon/>
       </Fab>
       </Grid>
       </Grid>
       </Box>
       ))}
     </div>
   );
 };
 
 export default LabelList;
 