import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, Button } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import '../assets/styles/headerStyles.css';

const Header = () => {
  return (
    <div className="header-root">
      <AppBar position="static" className="header-appBar">
        <Toolbar>
          <div className="header-logo">
            <Typography variant="h6" className="header-logoText">
              BOTÁNICA ONLINE
            </Typography>
            <div className="header-search">
              <InputBase
                placeholder="Buscador..."
                classes={{
                  root: 'header-inputRoot',
                  input: 'header-inputInput',
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
              <div className="header-searchIcon">
                <SearchIcon />
              </div>
            </div>
          </div>
          <Button variant="contained" className="header-button">
            Iniciar Sesión
          </Button>
          <Button variant="contained" className="header-button">
            Registrarse
          </Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className="header-navBar">
        <Toolbar>
          {['Inicio', 'Plantas', 'Semillas', 'Arreglos Florales', 'Jardineras y Macetas', 'Herramientas de Jardinería'].map((text) => (
            <Button key={text} className="header-navButton">
              {text}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;