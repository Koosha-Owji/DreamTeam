/**
 * AddContact.component.js, user can add a contact
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Update from './UpdateProfile.component';
import { useDispatch, useSelector } from 'react-redux';
import { update_password } from '../../actions/user';
import PasswordChecklist from "react-password-checklist";

const useStyles = makeStyles((theme)=> ({
    avatar: {
      backgroundColor: cyan[300],
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
  }));

// card component that pops up when users press the profile button on the navbar
export default function ProfileCard() {
    var user1 = useSelector((state) => state.auth.authData);
    const dispatch = useDispatch();
    if(!user1)
    {
      user1 = JSON.parse(localStorage.getItem('profile'));
      
    }
    const classes = useStyles();
    const [passwordDetails, setPasswordDetails]= React.useState({current_password: '',new_password:'',repeatNew_password: ''});
    const password_Changed = (useSelector((state) => state.auth.password_Changed));
    
    const handleSubmit = (event) => {
      if (passwordDetails){
          event.preventDefault();
          dispatch (update_password(passwordDetails))
          if(password_Changed!==null)
          {
            alert(password_Changed.message); 
            event.target.reset();
          }
      }

  }

    return (
        <div>
        <Card>
            <CardHeader
                style={{backgroundColor: "aliceblue"}}
                avatar={
                    <Avatar className={classes.avatar} aria-label="user">
                      {user1.result.first_name[0]}
                    </Avatar>
                  }
                action={
                    <Update profile={user1}/>
                }
                titleTypographyProps={{variant:'h5', align:"left"  }}
                title={user1.result.first_name + " " + user1.result.last_name}
                />
            <CardContent>

                <Typography variant="subtitle1" align="left">
                Email Address: {user1.result.email_address}
                </Typography>

                <Typography mt={10} variant="subtitle1" align="left" color="text.secondary">
                Department: {user1.result.department}
                </Typography>

                <Typography mt={2} variant="subtitle1" align="left" color="text.secondary">
                Role: {user1.result.role}
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="current_password"
                  label="Current Password"
                  type="password"
                  fullWidth
                  onChange={(e) => setPasswordDetails({...passwordDetails, current_password:e.target.value})}
                ></TextField>

                <TextField
                  autoFocus
                  margin="dense"
                  id="new_password"
                  label="New Password"
                  type="password"
                  fullWidth
                  onChange={(e) => setPasswordDetails({...passwordDetails, new_password:e.target.value})}
                ></TextField>

                <TextField
                  autoFocus
                  margin="dense"
                  id="repeatNew_password"
                  label="Repeat password"
                  type="password"
                  fullWidth
                  onChange={(e) => setPasswordDetails({...passwordDetails, repeatNew_password:e.target.value})}
                ></TextField>

                {/* Button for saving profile changes */}
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit} >Save changes</Button>

                  {/* Password rules */}
                  <PasswordChecklist
				            rules={["minLength","number","capital","match"]}
				            minLength={5}
				            value={passwordDetails.new_password}
				            valueAgain={passwordDetails.repeatNew_password}
			            />
                </form>
            </CardContent>
        </Card>
        </div>
    );
}