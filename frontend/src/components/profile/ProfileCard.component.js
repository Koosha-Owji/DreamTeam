import * as React from 'react';
//import { styled } from '@mui/material/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { cyan } from '@material-ui/core/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
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
                    // <Fab variant="extended" color="primary" aria-label="update" style={{display:'flex'}} >
                    //     <UpdateIcon/>
                    // </Fab>
                    //<Grid item xs={1} textA>
                    <Update profile={user1}/>
                    //</Grid>
                }
                titleTypographyProps={{variant:'h5', align:"left"  }}
                title={user1.result.first_name + " " + user1.result.last_name}
                //subheader={user.email_address}
                />
            <CardContent>
                {/* <Typography color="text.secondary" sx={{ fontSize:100, fontWeight:"medium"}}> */}
                {/* <Typography variant="h5" component="div">
                {name}
                </Typography> */}
                {/* <Typography mt={2} sx={{ mb: 1.5}} variant="caption text" color="text.secondary"> */}
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
                <Button 
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit} >Save changes</Button>
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