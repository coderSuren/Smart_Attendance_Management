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
              <TableCell>Course Code</TableCell>
              <TableCell>Faculty ID</TableCell>
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {row.class_date.slice(0,10)}
                </TableCell>
                {/* <TableCell>{row.class_date}</TableCell> */}
                <TableCell>{row.course_code}</TableCell>
                <TableCell>{row.faculty_id}</TableCell>
                <TableCell>{row.attendance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
  );
}

export default CustomTable;