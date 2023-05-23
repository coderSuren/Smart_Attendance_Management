import React from 'react';
import Popup from 'reactjs-popup';
import Map from './Map'
import './index.css';
import Button from "@material-ui/core/Button";

const Pop = () => {

    return(
    <div class="Popup">
    <Popup trigger={open => (
        <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{m:1,minWidth: 120,}}
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
)};

export default Pop;