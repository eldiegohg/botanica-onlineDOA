import axios from 'axios';

const API_URL = 'https://localhost:7050/api/Users';

export const login = async (user: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      user,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error en el inicio de sesión');
  }
};

export const register = async (nombre: string, user: string, password: string, rol: string) => {
  try {
    const response = await axios.post(`${API_URL}/CreateUser`, {
      nombre,
      user,
      password,
      rol,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error en el registro');
  }
};
