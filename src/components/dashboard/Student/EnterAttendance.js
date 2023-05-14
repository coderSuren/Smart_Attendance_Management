import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import Popup from './Popup'
function EnterAttendance() {
    return (
    <>
        {/* <Popup /> */}
        <Box component="main" sx={{ p: 4 }}>
            <TextField id="standard-basic" fullWidth label="Enter Attendance Code" variant="standard" />
            <br />
            <br />
            <Button variant="contained">Enter Code </Button>
        </Box>
    </>
    );
}

export default EnterAttendance;