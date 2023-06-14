import * as React from 'react';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { addConsoleHandler } from 'selenium-webdriver/lib/logging';
var lat=  0, long = 0;
var teacher_latitude = 0
var  teacher_longitude = 0;
function EnterAttendance({id}) {
    // const latitude = React.useState()
    const [longitude,setlongitude] = React.useState(long)
    const [latitude, setlatitude] = React.useState(lat);
    const [code, setCode] = React.useState('');
    const [error, setiserror] = React.useState(false);
    const [updated, setUpdated] = React.useState(false);
    const [failedupdation, setfailedupdation] = React.useState(false);
    const [message,setmessage] = React.useState('');
    const [backerror,setbackerror] = React.useState(false)
    

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Radius of the earth in kilometers
      
        // Convert latitude and longitude to radians
        const radLat1 = (Math.PI / 180) * lat1;
        const radLat2 = (Math.PI / 180) * lat2;
        const radLon1 = (Math.PI / 180) * lon1;
        const radLon2 = (Math.PI / 180) * lon2;
      
        const deltaLat = radLat2 - radLat1;
        const deltaLon = radLon2 - radLon1;
      
        const a =
          Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
          Math.cos(radLat1) *
            Math.cos(radLat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = earthRadius * c; // Distance in kilometers
        return distance*1000;
      }

      const [isLoginFailed, setisLoginFailed] = React.useState(null);

        const showError = () => {
            setiserror(true);
        };
        function handleDialogClose(){
            setiserror(false)
            setUpdated(false)
            setfailedupdation(false)
            setbackerror(false)
          }
      
    const printlocation = async (e) =>{ //main function
        // console.log(e)

        setCode(e.target.value);
        
        console.log(latitude,longitude,code,"your")

        //querying database for teacher coordinates and code
        const loginQuery = `SELECT teacher_latitude, teacher_longitude
        FROM Event
        WHERE random_code = '${code}'`;
        const coordoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: loginQuery }),
        // mode: 'cors',
        };
  
        // Define mysql localhost url
        const URL = 'http://localhost:5000/getcoords';
        // const URL = 'https://3348-2401-4900-4d44-db6a-e836-2078-6ba9-ac40.ngrok-free.app/';
        // http://localhost:5000/
        
        console.log(coordoptions)
        try {
        const resp = await fetch(URL, coordoptions);
        const data = await resp.json();
        console.log(data[0]);
        
        if (data[1].success){
          teacher_latitude  = data[0].teacher_latitude;
          teacher_longitude = data[0].teacher_longitude;
          
            const distance = calculateDistance(data[0].teacher_latitude,data[0].teacher_longitude,latitude,longitude)
            console.log("dISTANCE IS",distance,typeof(distance))
            if(distance<10){
                console.log(id)
                const Query1 =`SELECT course_code, class_date
                FROM Event
                WHERE random_code= '${code}'`;;
                const markoptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: Query1 ,email:id}),
                    // mode: 'cors',
                    };
                const URL = 'http://localhost:5000/markattendance';
                try{
                    const response = await fetch(URL,markoptions);
                    const data = await response.json();
                    console.log(data,"hello");
                    
                    if(data[1].success){
                        setUpdated(true);
                        console.log("success")
                    }
                    else{
                        setmessage(data[2].message)
                        setbackerror(true)
                        // console.log("failed")
                    }
                  }catch(e){
                    console.log(e);
            
                  }

            }else{
                setfailedupdation(true)
            }
            
        }
        else{
            showError();
            // setIsLogin(true);
            
        }
        } catch (e) {
        showError();
        }


    }
    
    function getLocation() {
        return new Promise(function(resolve, reject) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          } else {
            reject("Geolocation is not supported by this browser.");
          }
        });
      }
      getLocation()
      .then(function(position){
          setlatitude(position.coords.latitude)
          setlongitude(position.coords.longitude)
          lat = position.coords.latitude;
          long = position.coords.longitude;

          if (teacher_latitude == 0) {
            teacher_latitude = lat;
          }
          if (teacher_longitude == 0) {
            teacher_longitude = long;
          }
          console.log('Student')
          console.log(lat, long);
          console.log('Teacher')
          console.log(teacher_latitude, teacher_longitude)
      })
      .catch(function(error) {
        console.log(error);
      });
      
    //   getLocation()
    //     .then(function(position) {
    //     //   latitude = position.coords.latitude;
    //     //   longitude = position.coords.longitude;
    //       console.log(position.coords.latitude, position.coords.longitude);
    //       return [position.coords.latitude,position.coords.longitude]
          
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });


    return (
    <>
        {/* <Popup /> */}
        <Box component="main" sx={{ p: 4 }}>
            <TextField id="standard-basic" fullWidth label="Enter Attendance Code" variant="standard" onChange={(e) => setCode(e.target.value)} value={code}/>
            <br />
            <br />

            <Button variant="contained" onClick={(e) => printlocation(e)}>Enter Code </Button>

        </Box>
        <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_API}
        style={{
          width: "100%",
          height: "500px",
          borderRadius: "15px",
          border: "2px solid red",
        }}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 18,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={longitude} latitude={latitude} />
        <Marker longitude={teacher_longitude} latitude={teacher_latitude}  style={{ color: "red" }}/>
        <NavigationControl position="bottom-right" />
        <FullscreenControl />

        <GeolocateControl />
      </Map>
        <Dialog open={error} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Code does not match. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updated} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have successfully submitted your Attendance
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={failedupdation} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are more than 10 meters farther from the teacher's location.
            If not, please tell your teacher to mark you present.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={backerror} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Updation failed!
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
    );
}

export default EnterAttendance;