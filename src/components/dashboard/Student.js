import React,{useState} from 'react';
import{
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material";
import Table from './Table'

const Student = ({}) => {
    return (
        <>       
        <AppBar position="static">
        <Container maxWidth="xl" type="flex">
        <Toolbar disableGutters>
            <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.0rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            Smart Attendance System
            </Typography>

            
        </Toolbar>
        </Container>
        </AppBar>
        <div>
            <Table />
            <Table />
        </div>
        </>
    );
} 

export default Student;