import React from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { locale } from 'dayjs';
// import axios from "axios";

// function createData(n,cal,f,car,p) {
//     return { name:n, calories:cal, fat:f, carbs:car, protein:p };
// }
  
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
  
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
  },
  table: {
    minWidth: 650,
  },
}));


const CustomTable = (props) =>{
    const rows=props.data;
    // console.log(props.data);
    const classes = useStyles();
    return (  
        <Paper className={classes.paper}>
        <TableContainer>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Course ID</TableCell>
              <TableCell>Start Period</TableCell>
              <TableCell>End Period</TableCell>
              <TableCell>Number Of Hours</TableCell>
              <TableCell>Present</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.Date}
                </TableCell>
                <TableCell>{row.CourseID}</TableCell>
                <TableCell>{row.StartPeriod}</TableCell>
                <TableCell>{row.EndPeriod}</TableCell>
                <TableCell>{row.NumberOfHours}</TableCell>
                <TableCell>{row.Present}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
  );
}

export default CustomTable;