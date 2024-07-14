import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import '../assets/styles/ResetPasswordView.css';

const ResetPasswordView: React.FC = () => {
  return (
    <div className="resetPasswordView-container">
      <Container component="main" maxWidth="xs">
        <div className="resetPasswordView-paper">
          <Typography component="h1" variant="h5">
            Recuperar contraseña
          </Typography>
          <form className="resetPasswordView-form" noValidate>
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
              className="resetPasswordView-textField"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="resetPasswordView-submit"
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPasswordView;
