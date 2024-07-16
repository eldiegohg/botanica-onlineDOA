import React, { FC } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import '../assets/styles/LoginView.css';
import { login } from '../services/authService';

interface LoginViewProps {
  handleLogin: (isAdmin: boolean) => void;
}

const LoginView: FC<LoginViewProps> = ({ handleLogin }) => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    handleLogin(false);
    navigate('/');
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failure');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = formData.get('user') as string;
    const password = formData.get('password') as string;

    try {
      await login(user, password);
      const isAdmin = user === 'BotanicaOnline' && password === 'BotanicaOnline';
      handleLogin(isAdmin);
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <GoogleOAuthProvider clientId="1092123106626-ef01rab048vf7rm8tnd1p3aruoeun3v7.apps.googleusercontent.com">
      <div className="loginView-container">
        <Container component="main" maxWidth="xs">
          <div className="loginView-paper">
            <Typography component="h1" variant="h5">
              Inicio de sesión
            </Typography>
            <form className="loginView-form" noValidate onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuario"
                name="user"
                autoComplete="username"
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
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                />
              </Box>
              <Box mt={2}>
                <Typography variant="body2" align="center">
                  ¿Aún no tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" align="center">
                  ¿Olvidaste tu contraseña? <Link to="/reset-password">Recupérala aquí</Link>
                </Typography>
              </Box>
            </form>
          </div>
        </Container>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginView;
