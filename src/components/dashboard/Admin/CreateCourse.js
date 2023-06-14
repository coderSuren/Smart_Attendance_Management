
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TableCell } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


function CreateCourse() {
  const [invalidQuery, setInvalidQuery] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [inserted, setinserted] = React.useState(false);
  const resolveQuery = async () => {
    console.log(courseTitle)
    const queryOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: `INSERT INTO Course (course_code, course_title) VALUES ('${courseCode}', '${courseTitle}');`}),
    };
    console.log(queryOptions)
    // Validation for course code and course title.
    if (courseCode ==="" || courseTitle === "") {
      setInvalidQuery(true);
    }
    console.log(queryOptions);

    // Define mysql localhost URL   
    const URL = 'http://localhost:5000/admin';

    try {
      const resp = await fetch(URL, queryOptions);
      const data = await resp.json();
      // console.log(data)
      // var columnHeadings = Object.keys(data[0]);
      if (data.affectedRows) {    
            
        setinserted(true);
    }
      else {
        setInvalidQuery(true)
      }

    } catch (e) {

      setInvalidQuery(true);
      console.log(e);


      console.log("INVALID QUERY WAS ENTERED");

    }
  };

  return (
    <Box component="main" sx={{ p: 7 }}>
      <TextField
        id="courseCode"
        fullWidth
        label="Enter Course Code"
        variant="standard"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />

      <TextField
        id="courseTitle"
        fullWidth
        label="Enter Course Title"
        variant="standard"
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
      />

      <br />
      <br />
      <Button variant="contained" onClick={resolveQuery}>
        Create Course
      </Button>

      <br />
      <br />

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

    </Box>
  );
}

export default CreateCourse;
