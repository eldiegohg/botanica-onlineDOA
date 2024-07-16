import React from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/RegisterView.css';
import { register } from '../services/authService';

const RegisterView: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nombre = formData.get('nombre') as string;
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const rol = '1'; 

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(nombre, user, password, rol);
      navigate('/login');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  return (
    <div className="registerView-container">
      <Container component="main" maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <div className="registerView-paper">
              <Typography component="h1" variant="h5">
                Registro
              </Typography>
              <form className="registerView-form" noValidate onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre completo"
                  name="nombre"
                  autoComplete="name"
                  autoFocus
                  className="registerView-textField"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Usuario"
                  name="user"
                  autoComplete="username"
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
                    ¿Tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
                  </Typography>
                </Box>
              </form>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className="registerView-info">
            <Box className="registerView-infoBox">
              <Typography component="h1" variant="h4">
                En <strong>Botánica Online</strong>
              </Typography>
              <Typography component="h2" variant="h5">
                Descubre la mejor selección de plantas para tu hogar y oficina.
              </Typography>
              <Typography component="h3" variant="subtitle1">
                Plantas que inspiran, entregas que emocionan.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default RegisterView;
