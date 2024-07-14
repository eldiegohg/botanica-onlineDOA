import axios from 'axios';

const PLANTS_API_URL = 'https://localhost:7050/api/PlantasInterior';
const SEEDS_API_URL = 'https://localhost:7050/api/Semillas';
const FLORAL_API_URL = 'https://localhost:7050/api/Arreglos';
const JARDINERAS_API_URL = 'https://localhost:7050/api/Jardineras';
const HERRAMIENTAS_API_URL = 'https://localhost:7050/api/Herramientas';

export interface Plant {
  pkPlanta: number;
  nombre: string;
  tipo: string;
  categoria: string;
  descripcion: string;
  precio: number;
}

export interface Seed {
  pkSeed: number;
  nombre: string;
  tipo: string;
  categoria: string;
  descripcion: string;
  precio: number;
}

export interface FloralArrangement {
  pkArreglo: number;
  nombre: string;
  categoria: string;
  flores: string;
  descripcion: string;
  precio: number;
}

export interface Planter {
  pkJardinera: number;
  nombre: string;
  categoria: string;
  tipo: string;
  material: string;
  descripcion: string;
  precio: number;
}

export interface Tool {
  pkHerramienta: number;
  nombre: string;
  categoria: string;
  tamaño: string;
  material: string;
  descripcion: string;
  precio: number;
}

///PLANTAS
export const fetchPlants = async (): Promise<Plant[]> => {
  try {
    const response = await axios.get(PLANTS_API_URL);
    return response.data.data || []; // Ajusta según la estructura de la respuesta
  } catch (error) {
    throw new Error('Error fetching plants');
  }
};

export const addPlant = async (plant: Omit<Plant, 'pkPlanta'>): Promise<Plant> => {
  try {
    const response = await axios.post(PLANTS_API_URL, plant);
    return response.data;
  } catch (error) {
    throw new Error('Error adding plant');
  }
};

export const updatePlant = async (id: number, plant: Omit<Plant, 'pkPlanta'>): Promise<Plant> => {
  try {
    const response = await axios.put(`${PLANTS_API_URL}/UpdateHerramienta/${id}`, plant);
    return response.data;
  } catch (error) {
    throw new Error('Error updating plant');
  }
};

export const deletePlant = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${PLANTS_API_URL}/deleteHerramienta/${id}`);
  } catch (error) {
    throw new Error('Error deleting plant');
  }
};

////SEMILLAS
export const fetchSeeds = async (): Promise<Seed[]> => {
  try {
    const response = await axios.get(SEEDS_API_URL);
    return response.data.data || []; // Ajusta según la estructura de la respuesta
  } catch (error) {
    throw new Error('Error fetching seeds');
  }
};

export const addSeed = async (seed: Omit<Seed, 'pkSeed'>): Promise<Seed> => {
  try {
    const response = await axios.post(SEEDS_API_URL, seed);
    return response.data;
  } catch (error) {
    throw new Error('Error adding seed');
  }
};

export const updateSeed = async (seedId: number, seed: Omit<Seed, 'pkSeed'>): Promise<Seed> => {
  try {
    const response = await axios.put(`${SEEDS_API_URL}/UpdateHerramienta/${seedId}`, seed);
    return response.data;
  } catch (error) {
    throw new Error('Error updating seed');
  }
};

export const deleteSeed = async (seedId: number): Promise<void> => {
  try {
    await axios.delete(`${SEEDS_API_URL}/deleteHerramienta/${seedId}`);
  } catch (error) {
    throw new Error('Error deleting seed');
  }
};

////ARREGLOS FLORALES
export const fetchFloralArrangements = async (): Promise<FloralArrangement[]> => {
  try {
    const response = await axios.get(FLORAL_API_URL);
    return response.data.data || []; // Ajusta según la estructura de la respuesta
  } catch (error) {
    throw new Error('Error fetching floral arrangements');
  }
};

export const addFloralArrangement = async (floralArrangement: Omit<FloralArrangement, 'pkArreglo'>): Promise<FloralArrangement> => {
  try {
    const response = await axios.post(`${FLORAL_API_URL}/CreateArreglo`, floralArrangement);
    return response.data;
  } catch (error) {
    throw new Error('Error adding floral arrangement');
  }
};

export const updateFloralArrangement = async (id: number, floralArrangement: Omit<FloralArrangement, 'pkArreglo'>): Promise<FloralArrangement> => {
  try {
    const response = await axios.put(`${FLORAL_API_URL}/UpdateArreglo/${id}`, floralArrangement);
    return response.data;
  } catch (error) {
    throw new Error('Error updating floral arrangement');
  }
};

export const deleteFloralArrangement = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${FLORAL_API_URL}/deleteArreglo/${id}`);
  } catch (error) {
    throw new Error('Error deleting floral arrangement');
  }
};

////JARDINERAS
export const fetchPlanters = async (): Promise<Planter[]> => {
  try {
    const response = await axios.get(JARDINERAS_API_URL);
    return response.data.data || [];
  } catch (error) {
    throw new Error('Error fetching planters');
  }
};

export const addPlanter = async (planter: Omit<Planter, 'pkJardinera'>): Promise<Planter> => {
  try {
    const response = await axios.post(`${JARDINERAS_API_URL}`, planter);
    return response.data;
  } catch (error) {
    throw new Error('Error adding planter');
  }
};

export const updatePlanter = async (id: number, planter: Omit<Planter, 'pkJardinera'>): Promise<Planter> => {
  try {
    const response = await axios.put(`${JARDINERAS_API_URL}/UpdateHerramienta/${id}`, planter);
    return response.data;
  } catch (error) {
    throw new Error('Error updating planter');
  }
};

export const deletePlanter = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${JARDINERAS_API_URL}/deleteHerramienta/${id}`);
  } catch (error) {
    throw new Error('Error deleting planter');
  }
};

////HERRAMIENTAS
export const fetchTools = async (): Promise<Tool[]> => {
  try {
    const response = await axios.get(HERRAMIENTAS_API_URL);
    return response.data.data || [];
  } catch (error) {
    throw new Error('Error fetching tools');
  }
};

export const addTool = async (tool: Omit<Tool, 'pkHerramienta'>): Promise<Tool> => {
  try {
    const response = await axios.post(HERRAMIENTAS_API_URL, tool);
    return response.data;
  } catch (error) {
    throw new Error('Error adding tool');
  }
};

export const updateTool = async (id: number, tool: Omit<Tool, 'pkHerramienta'>): Promise<Tool> => {
  try {
    const response = await axios.put(`${HERRAMIENTAS_API_URL}/UpdateHerramienta/${id}`, tool);
    return response.data;
  } catch (error) {
    throw new Error('Error updating tool');
  }
};

export const deleteTool = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${HERRAMIENTAS_API_URL}/deleteHerramienta/${id}`);
  } catch (error) {
    throw new Error('Error deleting tool');
  }
};
