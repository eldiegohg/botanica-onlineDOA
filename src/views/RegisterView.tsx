import React from 'react';
import { Container, TextField, Button, Typography, Box, Grid, Paper } from '@mui/material';
import '../assets/styles/RegisterView.css';

const RegisterView: React.FC = () => {
  return (
    <Grid container component="main" className="registerView-root">
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="registerView-paper">
        <div className="registerView-content">
          <Typography component="h1" variant="h5">
            Bienvenido
          </Typography>
          <form className="registerView-form" noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre completo"
              name="name"
              autoComplete="name"
              autoFocus
              className="registerView-textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              className="registerView-textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Teléfono"
              name="phone"
              autoComplete="phone"
              className="registerView-textField"
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
              className="registerView-textField"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              className="registerView-textField"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="registerView-submit"
            >
              Enviar
            </Button>
            <Box mt={2}>
              <Typography variant="body2" align="center">
                ¿Tienes una cuenta? <a href="#">Inicia sesión aquí</a>
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className="registerView-image">
        <Box className="registerView-infoBox">
          <Typography component="h1" variant="h4">
            En <strong>Botánica Online</strong>
          </Typography>
          <Typography component="h2" variant="h5">
            descubre la mejor selección de plantas para tu hogar y oficina.
          </Typography>
          <Typography component="h3" variant="subtitle1">
            Plantas que inspiran, entregas que emocionan.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RegisterView;