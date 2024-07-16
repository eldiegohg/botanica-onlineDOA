import React, { FC, useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Button, Box, Drawer, List, ListItem, ListItemText, Grid, Popover, Dialog, DialogContent, DialogActions } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle as AccountCircleIcon, ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate para la redirección
import useMediaQuery from '@mui/material/useMediaQuery';
import '../assets/styles/Header.css';
import logo from '../assets/img/Logo.jpeg';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  const isSmallScreen = useMediaQuery('(max-width:960px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para el valor de búsqueda
  const navigate = useNavigate(); // Hook de navegación

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleSearchDialog = (open: boolean) => () => {
    setSearchDialogOpen(open);
  };

  const handleUserIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navLinks = (
    <>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Inicio" />
        </ListItem>
      </Link>
      <Link to="/plants" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Plantas" />
        </ListItem>
      </Link>
      <Link to="/seeds" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Semillas" />
        </ListItem>
      </Link>
      <Link to="/floral-arrangements" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Arreglos Florales" />
        </ListItem>
      </Link>
      <Link to="/planters-and-pots" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Jardineras y macetas" />
        </ListItem>
      </Link>
      <Link to="/gardening-tools" style={{ textDecoration: 'none' }}>
        <ListItem button className="navButton">
          <ListItemText primary="Herramientas de Jardinería" />
        </ListItem>
      </Link>
    </>
  );

  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} sm={4} md={3}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={logo} alt="BOTÁNICA ONLINE" className="logo" />
            </Link>
          </Grid>
          {!isSmallScreen && (
            <Grid item sm={4} md={6} className="searchBoxContainer">
              <Box component="form" onSubmit={handleSearchSubmit} className="searchBox"> {/* Cambiar a form y agregar onSubmit */}
                <SearchIcon className="searchIcon" />
                <InputBase
                  placeholder="Buscar…"
                  value={searchQuery}
                  onChange={handleSearchChange} // Manejar cambios
                  classes={{ root: 'inputRoot', input: 'inputInput' }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Box>
            </Grid>
          )}
          <Grid item xs={6} sm={4} md={3} container justifyContent="flex-end">
            {isLoggedIn ? (
              <>
                <IconButton className="userIcon" aria-describedby={id} onClick={handleUserIconClick}>
                  <AccountCircleIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box p={2}>
                    <Button onClick={handleLogout} variant="contained" className="logoutButton" fullWidth>
                      Cerrar Sesión
                    </Button>
                    <Button component={Link} to="/profile" variant="contained" className="profileButton" fullWidth>
                      Perfil
                    </Button>
                  </Box>
                </Popover>
                <IconButton component={Link} to="/cart" className="cartIcon">
                  <ShoppingCartIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton className="userIcon" aria-describedby={id} onClick={handleUserIconClick}>
                  <AccountCircleIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Box p={2}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" className="loginButton" fullWidth>
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: 'none', marginTop: '8px', display: 'block' }}>
                      <Button variant="contained" className="registerButton" fullWidth>
                        Registrarse
                      </Button>
                    </Link>
                  </Box>
                </Popover>
              </>
            )}
            {isSmallScreen && (
              <>
                <IconButton edge="start" className="menuIcon" aria-label="menu" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <IconButton edge="start" className="searchToggleIcon" aria-label="search" onClick={toggleSearchDialog(true)}>
                  <SearchIcon />
                </IconButton>
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      {!isSmallScreen && <Toolbar className="navBar">{navLinks}</Toolbar>}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)} classes={{ paper: 'drawer' }}>
        <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {navLinks}
        </List>
      </Drawer>
      <Dialog open={searchDialogOpen} onClose={toggleSearchDialog(false)} fullWidth>
        <DialogContent>
          <Box component="form" onSubmit={handleSearchSubmit} className="searchBox"> {/* Cambiar a form y agregar onSubmit */}
            <SearchIcon className="searchIcon" />
            <InputBase
              placeholder="Buscar…"
              value={searchQuery}
              onChange={handleSearchChange} // Manejar cambios
              classes={{ root: 'inputRoot', input: 'inputInput' }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleSearchDialog(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;
