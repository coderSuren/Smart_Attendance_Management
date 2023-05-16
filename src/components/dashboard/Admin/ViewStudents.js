import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { uncapitalizeObjectKeys } from '@mui/x-date-pickers/internals';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  reloadButton: {
    alignItems: 'right',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  table: {
    width: '100%'
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


function ViewStudents() {
    const classes = useStyles();
    var rows = [];

  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false)
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false)
  const [courseCode, setCourseCode] = React.useState('');
  const [assignedTeacherID, setAssignedTeacherID] = React.useState('');
  
  const getTableFromDatabase = async () => {
      const studentTableQuery = `select * from Student`;
      const studentTableQueryOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: studentTableQuery}),
            // mode: 'cors',
        };
        
        // Define mysql localhost url
        const URL = 'http://localhost:5000/login';
        // const URL = 'https://3348-2401-4900-4d44-db6a-e836-2078-6ba9-ac40.ngrok-free.app/';
        // http://localhost:5000/
        
        console.log(studentTableQueryOptions)
        try {
            const resp = await fetch(URL, studentTableQueryOptions);
            const data = await resp.json();
            console.log(data);
            
            const studentData = data;
            rows = data;
           
              console.log(rows);

            
        } catch (e) {
            console.log(e);
    }
  };
  getTableFromDatabase();
  return <>
      <Container component="main" maxWidth="xl">
        <h2>View Students</h2>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Student ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Section</TableCell>
            <TableCell align="right">Specialization</TableCell>
            <TableCell align="right">Semester</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Object.keys(rows).forEach(function(key){
              var row = rows[key];
            <TableRow>
              <TableCell align="right">{row.student_id}</TableCell>
        </TableRow>
            })}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
    </>
  }
 
export default ViewStudents;