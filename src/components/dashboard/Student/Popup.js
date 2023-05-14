import React from 'react';
import Popup from 'reactjs-popup';
import Map from './Map'
import './index.css';
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { right } from '@popperjs/core';


// const theme = createTheme({
//     palette: {
//       primary: '#1976d2',
//     },
// });
const useStyles = makeStyles((theme) => ({
    submitButton: {
      margin: theme.spacing(1),
      alignContent: right,
    }
}));

const Pop = () => {
    const classes= useStyles();
    return<div class="Popup">
    <Popup trigger={open => (
        <Button
        //  className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
          sx={{m:1,minWidth: 120,backgroundColor:"#1976d2",}}
        // onSubmit={}
      >
        View Location
        </Button>
    )}
    position="right top"
    closeOnDocumentClick  modal>
    <Map />
    </Popup>
    </div>
};

export default Pop;