import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    userInputField: {
        width: '100%',
        margin: theme.spacing(1, 1, 3, 1),
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function CreateAdmin() {
    const classes = useStyles();

    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false)
    const [adminID, setAdminID] = React.useState('');
    const [invalidQuery, setInvalidQuery] = React.useState(false);
    const [inserted, setinserted] = React.useState(false);

    const handleSubmit = async(event) => {
        event.preventDefault()

        const queryOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ query: "INSERT INTO Course (course_code, course_title) VALUES (" + "'"
            //  + courseCode + "', '" +  + courseTitle + "');"}),
            body:JSON.stringify({query:`INSERT INTO Admin (admin_id, email, password) VALUES ('${adminID}', '${email}', '${password}');`})
          };
      
          // Validation for course code and course title.
        //   if (courseCode ==="" || courseTitle === "") {
        //     setInvalidQuery(true);
        //   }
          console.log(queryOptions);
      
          // Define mysql localhost URL   
          const URL = 'http://localhost:5000/admin';
      
          try {
            const resp = await fetch(URL, queryOptions);
            const data = await resp.json();
            console.log(data)
            // var columnHeadings = Object.keys(data[0]);
            // console.log(columnHeadings,"hguh")
            if (data.affectedRows) {    
            
                setinserted(true);
            }
            else {
                  setInvalidQuery(true);
            }
      
          } catch (e) {
      
            // setInvalidQuery(true);
            console.log(e);
      
      
            console.log("INVALID QUERY WAS ENTERED");
      
          }
        

       
    }

    return <>
        <Container component="main" maxWidth="m">
            <h2>Create Admin</h2>
            <div className={classes.paper}>
                <form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="Admin ID"
                        onChange={e => setAdminID(e.target.value)}
                        required
                        autoFocus
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        // type="email"

                        value={adminID}
                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="email"
                        value={email}

                    />
                    <Box sx={{ marginTop: '10px' }} />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="password"
                        value={password}
                        error={passwordError}
                    />
                    <Button variant="outlined" color="secondary" type="submit" classes={classes.userInputField}>Create Admin Account</Button>
                </form>
            </div>
        </Container>
        <Dialog open={invalidQuery} onClose={() => { setInvalidQuery(false); setinserted(false); }}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invalid Query. Please check and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setInvalidQuery(false); }} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={inserted} onClose={() => { setInvalidQuery(false); setinserted(false); }}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Entry stored in database
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setInvalidQuery(false); setinserted(false);}} color="primary">
            OK
          </Button>
        </DialogActions>
        </Dialog>
    </>
}

export default CreateAdmin;