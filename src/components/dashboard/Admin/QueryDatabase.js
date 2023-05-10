import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';

function QueryDatabase() {
    return <>
        <Box component="main" sx={{ p: 7 }}>
            <TextField id="standard-basic" fullWidth label="Enter Query" variant="standard" />
            <br />
            <br />
            <Button variant="contained">Submit Query </Button>
        </Box>
    </>
}

export default QueryDatabase;