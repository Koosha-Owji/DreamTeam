import { GoogleLogin } from 'react-google-login';
import { Button, Grid, Typography, Container,TextField } from '@material-ui/core';
import useStyles from './Styles';
import React,{ useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { sendEmail,linkEmail } from '../../actions/email';

const Icon = () => (
    <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24">
        <path
        fill="currentColor"
        d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
        />
    </svg>
    );

const initialState = {toEmail: null, Subject: null, message: null};

const Google = () => {

    const classes = useStyles();
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch();
    const emailData = useSelector((state) => state.email);

    const googleSuccess = async (res) => {
        const result = {code:res?.code};
        alert('Success');
        dispatch(linkEmail(result));
    };
    const googleError = (res) => {
        console.log(res);
    };
    const handleSubmit = (e) => {
        e.preventDefault(); 
        if(form.toEmail!=null&&form.message!=null&&form.Subject!=null)
        {
            dispatch(sendEmail(form));
            if(emailData)
            {
            alert("Email sent!");
            }
            setForm(e.target.reset());
        }
        else
        {
            alert("Enter the details!");
        }
      };
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

return (
    <Container component="main" maxWidth="xs">  
        <GoogleLogin
            clientId="678095570684-gnjgmcakmnmd64lmb3qom978v31jfucg.apps.googleusercontent.com"
            render={(renderProps) => (
                <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                  Link to DreamTeam CRM
                </Button>
              )}
            responseType="code"
            redirectUri="postmessage"
            scope="https://mail.google.com/"
            accessType="offline"
            prompt="consent"
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />            
          <Typography component="h1" variant="h5">
          Send Email
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                    name="toEmail"
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="toEmail"
                    label="Email address"
                    autoComplete="email"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    name="Subject"
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    id="Subject"
                    label="Subject"
                    autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    name="message"
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={6}
                    id="message"
                    label="Text"
                    autoFocus
                    />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Send Email
                </Button>
            </Grid>
        </form>
    </Container>
)
};
export default Google;
