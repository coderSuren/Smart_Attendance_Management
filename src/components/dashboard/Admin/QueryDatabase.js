import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function QueryDatabase() {
  const [userQuery, setUserQuery] = useState('');
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
      const data = await resp.text();
      console.log(data);
      setQueryResult(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box component="main" sx={{ p: 7 }}>
      <TextField
        id="standard-basic"
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
    </Box>
  );
}

export default QueryDatabase;
