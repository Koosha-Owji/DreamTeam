import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import EmailIcon from '@material-ui/icons/Email';
import TodayIcon from '@material-ui/icons/Today';
import NoteIcon from '@material-ui/icons/Note';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

import NotePages from './Notes/NotePages';
import Google from './Email/Google.component';
import ProfilePage from './profile/ProfilePage.component';
import ContactsPage from './contact/ContactPage';
import OrderPage from './order/OrderList.component';
import MeetingPage from './Meetings/MeetingPage.js'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color:'sky-blue'
  },
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });

    history.push('/user');

    setUser(null);
  },[dispatch,history])
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 4000 < new Date().getTime())logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location,user?.token,logout]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue('one');
    setOpen(false);
  };

  return (
    <div className={classes.root} >
      <Dialog open={open} TransitionComponent={Transition}
        keepMounted onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="xs">
            <ProfilePage/>
        </Dialog>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example" centered >
          <Tab value="one" label="Contacts" icon= {<PermContactCalendarIcon/>}wrapped {...a11yProps('one')}/>
          <Tab value="two" label="Emails" icon= {<EmailIcon/>} {...a11yProps('two')}/>
          <Tab value="three" label="Meetings" icon= {<TodayIcon/>} {...a11yProps('three')} />
          <Tab value="four" label="Notes" icon= {<NoteIcon/>} {...a11yProps('four')} />
          <Tab value="five" label="Orders" icon= {<WorkIcon/>} {...a11yProps('five')} />
          <Tab value="six" label="Profile" icon= {<PersonIcon/>} onClick={handleClickOpen} {...a11yProps('six')} />
          <Tab value="seven" label="LogOut" to='/' component={Link}  icon= {<ExitToAppOutlinedIcon/>} onClick={logout} {...a11yProps('seven')}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <ContactsPage/>
      </TabPanel>
      <TabPanel value={value} index="two">
        <Google contactEmail={""}/>
      </TabPanel>
      <TabPanel value={value} index="three">
        <MeetingPage/>
      </TabPanel>
      <TabPanel value={value} index="four">
        <NotePages/>
      </TabPanel>
      <TabPanel value={value} index="five">
        <OrderPage/>
      </TabPanel>
    </div>
  );
}
