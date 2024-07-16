import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Grid } from '@mui/material';
import { getCurrentUser, updateUserProfile, UserProfile } from '../services/authService';
import '../assets/styles/ProfileView.css';

const ProfileView: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile>({
    nombre: '',
    user: '',
    password: '',
    address: '',
  });
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempData, setTempData] = useState<UserProfile>({ ...userData });

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData({
          nombre: data.nombre,
          user: data.user,
          password: data.password,
          address: '', // Dirección simulada
        });
        setTempData({
          nombre: data.nombre,
          user: data.user,
          password: data.password,
          address: '', // Dirección simulada
        });
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(tempData);
      setUserData(tempData);
      setEditingField(null);
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

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
            id="nombre"
            label="Nombre"
            name="nombre"
            value={tempData.nombre}
            onChange={handleChange}
            className="profileView-textField"
            disabled={editingField !== 'nombre'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {editingField === 'nombre' ? (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={handleSave}
            >
              Guardar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={() => handleEdit('nombre')}
            >
              Editar
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="Usuario"
            name="user"
            value={tempData.user}
            onChange={handleChange}
            className="profileView-textField"
            disabled={editingField !== 'user'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {editingField === 'user' ? (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={handleSave}
            >
              Guardar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={() => handleEdit('user')}
            >
              Editar
            </Button>
          )}
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
            value={tempData.password}
            onChange={handleChange}
            className="profileView-textField"
            disabled={editingField !== 'password'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {editingField === 'password' ? (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={handleSave}
            >
              Guardar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={() => handleEdit('password')}
            >
              Editar
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="Dirección"
            name="address"
            value={tempData.address}
            onChange={handleChange}
            className="profileView-textField"
            disabled={editingField !== 'address'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {editingField === 'address' ? (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={handleSave}
            >
              Guardar
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className="profileView-editButton"
              onClick={() => handleEdit('address')}
            >
              Editar
            </Button>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileView;
