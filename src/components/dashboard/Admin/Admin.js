import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import RenderDashboard from './RenderDashboard'

const navbarPages = ['View Database', 'Create Entry', 'Query Database'];
const viewDatabaseOptions = ['View Students', 'View Faculty', 'View Courses'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const createDatabaseEntryOptions = ['Create Student', 'Create Course', 'Create Faculty', 'Create Admin', 'Assign student to class'];
const advancedOptions = ['Query Database'];

var currentPage = navbarPages[0];

function Admin() {
  const [isUserProfileIconSelected, setUserProfileIconSelected] = React.useState(null);
  const [isCreateDatabaseEntrySelected, setCreateDatabaseEntrySelected] = React.useState(null);
  const [isViewDatabaseSelected, setViewDatabaseSelected] = React.useState(null);
  const [isDatabaseQuerySelected, setDatabaseQuerySelected] = React.useState(null);

  return (
    <>
      <AppBar position="static" display="flex">
        <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ flexGrow: 1, justifyContent: 'flex-start' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: -80,
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

            <Box sx={{ flexGrow: 1, display: 'flex' }}>

              <Button onClick={(event) => {setViewDatabaseSelected(event.currentTarget);}} sx={{ my: 2, color: 'white', display: 'flex' }}>
                View Database
              </Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={isViewDatabaseSelected}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(isViewDatabaseSelected)}
                onClose={(option) => {currentPage = option; console.log(option); setViewDatabaseSelected(null); }}
              >
                {viewDatabaseOptions.map((option) => (
                  <MenuItem key={option} onClick={() => {currentPage = option; console.log(option); setViewDatabaseSelected(null);}}>
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Button onClick={(event) => {setCreateDatabaseEntrySelected(event.currentTarget);}} sx={{ my: 2, color: 'white', display: 'flex' }}>
                Create new Entry
              </Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={isCreateDatabaseEntrySelected}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(isCreateDatabaseEntrySelected)}
                onClose={(option) => {currentPage = option; console.log(option); setCreateDatabaseEntrySelected(null);}}
              >
                {createDatabaseEntryOptions.map((option) => (
                  <MenuItem key={option} onClick={() => {currentPage = option; console.log(currentPage); setCreateDatabaseEntrySelected(null);}}>
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>


              <Button onClick={(event) => {setDatabaseQuerySelected(event.currentTarget);}} sx={{ my: 2, color: 'white', display: 'flex' }} id='advanced'>

                Advanced Options
              </Button>
              <Menu
                sx={{ mt: '45px' }}
                id="query-database"
                anchorEl={isDatabaseQuerySelected}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(isDatabaseQuerySelected)}
                onClose={() => {setDatabaseQuerySelected(false);}}
              >
                {advancedOptions.map((option) => (
                  <MenuItem key={option} onClick={() => {currentPage = option; console.log(currentPage);setDatabaseQuerySelected(false);}}>
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => {setUserProfileIconSelected(event.currentTarget);}} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={isUserProfileIconSelected}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(isUserProfileIconSelected)}
                onClose={() => {setUserProfileIconSelected(false);}}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {setUserProfileIconSelected(false);}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <RenderDashboard currentPage={currentPage}/>
    </>
  );
}
export default Admin;