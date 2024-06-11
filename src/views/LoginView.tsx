import React from 'react';
import { Container, TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { Facebook, Google } from '@mui/icons-material';
import '../assets/styles/LoginView.css';

const LoginView: React.FC = () => {
  return (
    <div className="loginView-container">
      <Container component="main" maxWidth="xs">
        <div className="loginView-paper">
          <Typography component="h1" variant="h5">
            Inicio de sesión
          </Typography>
          <form className="loginView-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              className="loginView-textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              className="loginView-textField"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="loginView-submit"
            >
              Enviar
            </Button>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton color="primary">
                <Facebook />
              </IconButton>
              <IconButton color="primary">
                <Google />
              </IconButton>
            </Box>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                ¿Aún no tienes una cuenta? <a href="#">Regístrate aquí</a>
              </Typography>
            </Box>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default LoginView;