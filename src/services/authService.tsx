import axios from 'axios';

const API_URL = 'https://localhost:7050/api/Users';

export interface UserProfile {
  nombre: string;
  user: string;
  password: string;
  address?: string;
}

export const login = async (user: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      user,
      password,
    });
    localStorage.setItem('userId', response.data.pkUsuario); // Guardar userId en localStorage
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

export const getCurrentUser = async (): Promise<UserProfile> => {
  const userId = localStorage.getItem('userId'); // Obtener userId del localStorage
  if (!userId) {
    throw new Error('No user logged in');
  }
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los datos del perfil');
  }
};

export const updateUserProfile = async (profileData: UserProfile): Promise<UserProfile> => {
  const userId = localStorage.getItem('userId'); // Obtener userId del localStorage
  try {
    const response = await axios.put(`${API_URL}/UpdateUser/${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar los datos del perfil');
  }
};
