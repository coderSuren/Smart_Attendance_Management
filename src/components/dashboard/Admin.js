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
  const handleCloseUserMenuDb = () => {
    setAnchorElUserViewDB(null);
  };
  const handleCloseUserMenuCreateEntry = () => {
    setAnchorElUserCreateEntry(null);
  };
  const handleCloseUserMenuQuery = () => {
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
                <MenuItem key={viewDbOption} onClick={handleCloseUserMenuDb}>
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
                <MenuItem key={createEntry} onClick={handleCloseUserMenuCreateEntry}>
                  <Typography textAlign="center">{createEntry}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button
              key={pages[2]}
              onClick={handleOpenUserMenuQuery}
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
    <Box component="main" sx={{ p: 3 }} open={Boolean(anchorElUserQuery)}>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
      </Box>
    </>
  );
}
export default ResponsiveAppBar;