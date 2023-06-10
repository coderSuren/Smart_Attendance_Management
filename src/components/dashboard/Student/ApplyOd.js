import * as React from 'react';
import Box from '@mui/material/Box';

import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
}
));
function ApplyOD() {
    const classes = useStyles();
    return (
    <>
        <div className={classes.root}>
        
        <Box component="main" sx={{ p: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Enter Date" sx={{m:1,minWidth: 120,}} onChange={(date) => console.log(date)}/>
            </LocalizationProvider>
            <TextField id="standard-basic" fullWidth label="Enter Course ID" variant="standard" />
            <TextField id="standard-basic" fullWidth label="Enter Period" variant="standard" />
            <br />
            <br />
            <Button variant="contained">Apply </Button>
        </Box>
        </div>
    </>
    );
}

export default ApplyOD;