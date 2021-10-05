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
// import UpdateIcon from '@material-ui/icons/Update';
// import Fab from '@material-ui/core/Fab';
// import Grid from '@material-ui/core/Grid';
import Update from './UpdateProfile.component';

const useStyles = makeStyles({
    avatar: {
      backgroundColor: cyan[300],
    }
  })
export default function ProfileCard({user}) {
    //const [expanded, setExpanded] = React.useState(false);
    const user1 = user[0];
    const name = user1.result.first_name + " " + user1.result.last_name;
    const classes = useStyles()

    return (
        <div>
        <Card>
            <CardHeader
                style={{backgroundColor: "aliceblue"}}
                avatar={
                    <Avatar className={classes.avatar} aria-label="user">
                      {name[0]}
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
                title={name}
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
            </CardContent>
        </Card>
        </div>
    );
}