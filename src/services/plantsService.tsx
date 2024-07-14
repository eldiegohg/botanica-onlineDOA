// services/plantsService.js
import axios from 'axios';

const API_URL = 'https://localhost:7050';

export const getPlants = async () => {
  try {
    const response = await axios.get(`${API_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the plants!", error);
    throw error;
  }
};

// Repite esto para cada categoría: semillas, arreglos florales, jardineras y macetas, herramientas de jardinería
