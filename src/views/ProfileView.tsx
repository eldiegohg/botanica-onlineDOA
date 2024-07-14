import React from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import '../assets/styles/ProfileView.css';

const ProfileView: React.FC = () => {
  return (
    <Container component="main" maxWidth="md" className="profileView-container">
      <Typography component="h1" variant="h5" className="profileView-title">
        MI PERFIL
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre"
            name="name"
            autoComplete="name"
            className="profileView-textField"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="profileView-editButton"
          >
            Editar
          </Button>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            className="profileView-textField"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="profileView-editButton"
          >
            Editar
          </Button>
        </Grid>
        <Grid item xs={12} sm={9}>
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
            className="profileView-textField"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Button
            variant="contained"
            color="primary"
            className="profileView-editButton"
          >
            Editar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileView;
