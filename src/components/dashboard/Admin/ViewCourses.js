import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';

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

function ViewCourses() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const getTableFromDatabase = async () => {
      const studentTableQuery = `select * from Course`;
      const studentTableQueryOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: studentTableQuery }),
      };

      // Define mysql localhost URL
      const URL = 'http://localhost:5000/admin';

      try {
        const resp = await fetch(URL, studentTableQueryOptions);
        const data = await resp.json();
        setRows(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };

    getTableFromDatabase();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Container component="main" maxWidth="xl">
      <h2>View Courses</h2>
      {rows.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Course Code</b></TableCell>
                <TableCell align="center"><b>Title </b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((entry) => (
                <TableRow key={entry.course_code}>
                  <TableCell align="center">{entry.course_code}</TableCell>
                  <TableCell align="center">{entry.course_title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Button disabled>Fetching Data...</Button>
      )}
    </Container>
  );
}

export default ViewCourses;
