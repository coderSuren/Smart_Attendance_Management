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
import Popover from "@mui/material/Popover";
import MenuItem from '@mui/material/MenuItem';

const pages = ['View Database', 'Create Entry', 'Query Database'];
const viewDbOptions = ['View Students', 'View Faculty', 'View Courses'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const createEntryOptions = ['Create Student', 'Create Class', 'Create Faculty', 'Assign student to class'];

var currentPage = pages[0];
var selectQuery = false;

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUserCreateEntry, setAnchorElUserCreateEntry] = React.useState(null);
  const [anchorElUserViewDB, setAnchorElUserViewDB] = React.useState(null);
  const [anchorElUserQuery, setAnchorElUserQuery] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUserMenuViewDB = (event) => {
    setAnchorElUserViewDB(event.currentTarget);
  };
  const handleOpenUserMenuCreateEntry = (event) => {
    setAnchorElUserCreateEntry(event.currentTarget);
  };
  const handleOpenUserMenuQuery = (event) => {
    setAnchorElUserQuery(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseUserMenuDb = (option) => {
    console.log(option);
    selectQuery = false;
    currentPage = option;
    setAnchorElUserViewDB(null);
  };
  const handleCloseUserMenuCreateEntry = (option) => {
    console.log(option);
    selectQuery = false;
    currentPage = option;
    setAnchorElUserCreateEntry(null);
  };
  const handleCloseUserMenuQuery = (option) => {
    currentPage = option;
    selectQuery = true;
    console.log(option);
    setAnchorElUserQuery(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
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

            <Box sx={{ flexGrow: 1, display: 'flex' }}>

              <Button onClick={handleOpenUserMenuViewDB} sx={{ my: 2, color: 'white', display: 'block' }}>
                View Database
              </Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUserViewDB}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUserViewDB)}
                onClose={handleCloseUserMenuDb}
              >
                {viewDbOptions.map((viewDbOption) => (
                  <MenuItem key={viewDbOption} onClick={() => handleCloseUserMenuDb(viewDbOption)}>
                    <Typography textAlign="center">{viewDbOption}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Button onClick={handleOpenUserMenuCreateEntry} sx={{ my: 2, color: 'white', display: 'block' }}>
                Create new Entry
              </Button>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUserCreateEntry}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUserCreateEntry)}
                onClose={handleCloseUserMenuCreateEntry}
              >
                {createEntryOptions.map((createEntry) => (
                  <MenuItem key={createEntry} onClick={() => handleCloseUserMenuCreateEntry(createEntry)}>
                    <Typography textAlign="center">{createEntry}</Typography>
                  </MenuItem>
                ))}
              </Menu>

              <Button
                key={pages[2]}
                onClick={() => {
                  selectQuery = true;
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[2]}
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      { (currentPage === "View Students") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            View Students
          </Typography>
        </Box>
      }
      { (currentPage === "View Faculty") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            View Faculty
          </Typography>
        </Box>
      }
      { (currentPage === "View Courses") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            View Courses
          </Typography>
        </Box>
      }
      { (selectQuery) && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            Query Database
          </Typography>
        </Box>
      }
      { (currentPage === "Create Student") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            Create Student
          </Typography>
        </Box>
      }
      { (currentPage === "Create Class") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            Create Class
          </Typography>
        </Box>
      }
      { (currentPage === "Create Faculty") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
            Create Faculty
          </Typography>
        </Box>
      }
      { (currentPage === "Assign student to class") && 
        <Box component="main" sx={{ p: 3 }}>
          <Typography>
          Assign student to class
          </Typography>
        </Box>
      }
    </>
  );
}
export default ResponsiveAppBar;