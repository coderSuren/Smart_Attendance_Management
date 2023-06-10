
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


function QueryDatabase() {
  const [userQuery, setUserQuery] = useState('');
  const [invalidQuery, setInvalidQuery] = useState(false);
  const [queryResult, setQueryResult] = useState('');

  const resolveQuery = async () => {
    const queryOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery }),
    };

    // Define mysql localhost URL   
    const URL = 'http://localhost:5000/admin';

    try {
      const resp = await fetch(URL, queryOptions);
      const data = await resp.json();
      setQueryResult("");
      
      var columnHeadings = Object.keys(data[0]);
      if (!('code' in columnHeadings)) {
        setQueryResult(
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnHeadings.map((entry) => (
              <TableCell align="center" key={entry}><b>{entry}</b></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dataEntry, index) => (
            <TableRow key={index}>
              {columnHeadings.map((entry) => (
                <TableCell align="center" key={entry}>{dataEntry[entry]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>        
        )

        setInvalidQuery(false);
      }
      else {
    setQueryResult("INVALID");
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
        id="queryField"
        fullWidth
        label="Enter Query"
        variant="standard"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
      />

      <br />
      <br />
      <Button variant="contained" onClick={resolveQuery}>
        Submit Query
      </Button>
      
      <br />
      <br />
      <label>{queryResult}</label>

      <Dialog open={invalidQuery} onClose={() => {setInvalidQuery(false);}}>
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Invalid Query. Please check and try again.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {setInvalidQuery(false);}} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>

    </Box>
  );
}

export default QueryDatabase;

