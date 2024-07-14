import React, { FC } from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import '../assets/styles/Header.css';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({ isLoggedIn, handleLogout }) => {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" className="logo">
            BOTÁNICA ONLINE
          </Typography>
        </Link>
        <Box className="searchBox">
          <SearchIcon className="searchIcon" />
          <InputBase
            placeholder="Buscar…"
            classes={{ root: 'inputRoot', input: 'inputInput' }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        {isLoggedIn ? (
          <>
            <Button onClick={handleLogout} variant="contained" className="logoutButton">
              Cerrar Sesión
            </Button>
            <Button component={Link} to="/profile" variant="contained" className="profileButton">
              Perfil
            </Button>
            <Button component={Link} to="/cart" variant="contained" className="cartButton">
              Carrito
            </Button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="contained" className="loginButton">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button variant="contained" className="registerButton">
                Registrarse
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
      <Toolbar className="navBar">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button className="navButton">Inicio</Button>
        </Link>
        <Button component={Link} to="/plants" className="navButton">
          Plantas
        </Button>
        <Button component={Link} to="/seeds" className="navButton">
          Semillas
        </Button>
        <Button component={Link} to="/floral-arrangements" className="navButton">
          Arreglos Florales
        </Button>
        <Button component={Link} to="/planters-and-pots" className="navButton">
          Jardineras y macetas
        </Button>
        <Button component={Link} to="/gardening-tools" className="navButton">
          Herramientas de Jardinería
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
