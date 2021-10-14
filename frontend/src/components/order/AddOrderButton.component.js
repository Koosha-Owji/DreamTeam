/**
 *  AddOrderButton.component.js, functional button to enable access to add order form
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddOrder from './AddOrder.component';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  }
}));


export default function AddContactButton({updateView}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**Function that is called from child component: AddOrder. Closes the add order dialogue
   * and sends the newly created order to parent component OrderList to be rendered
   */
  const closeFromChild = (newOrder) => {
    setOpen(false);
    updateView(newOrder);
  }



  return (
    <div className={classes.root}>
            <Fab color="primary" aria-label="add" variant='extended' onClick={handleClickOpen}>
            <AddIcon className={classes.extendedIcon}/>
                Add New Order
            </Fab>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add New Order</DialogTitle>
        <AddOrder closeFromChild={closeFromChild} />
        </Dialog>
    </div>
  );
} 