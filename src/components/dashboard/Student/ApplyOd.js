import * as React from 'react';
import Box from '@mui/material/Box';

import { makeStyles } from "@material-ui/core/styles";
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import Date from './Datepicker'

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
            <Date label="Enter Date"/>
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