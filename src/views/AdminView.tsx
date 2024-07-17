import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material';
import {
  fetchPlants, addPlant, updatePlant, deletePlant, Plant,
  fetchSeeds, addSeed, updateSeed, deleteSeed, Seed,
  fetchFloralArrangements, addFloralArrangement, updateFloralArrangement, deleteFloralArrangement, FloralArrangement,
  fetchPlanters, addPlanter, updatePlanter, deletePlanter, Planter,
  fetchTools, addTool, updateTool, deleteTool, Tool
} from '../services/apiService';
import '../assets/styles/AdminView.css';

const AdminView: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [floralArrangements, setFloralArrangements] = useState<FloralArrangement[]>([]);
  const [planters, setPlanters] = useState<Planter[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);

  const [newPlant, setNewPlant] = useState<Partial<Plant>>({});
  const [newSeed, setNewSeed] = useState<Partial<Seed>>({});
  const [newFloralArrangement, setNewFloralArrangement] = useState<Partial<FloralArrangement>>({});
  const [newPlanter, setNewPlanter] = useState<Partial<Planter>>({});
  const [newTool, setNewTool] = useState<Partial<Tool>>({});

  const [editPlant, setEditPlant] = useState<Plant | null>(null);
  const [editSeed, setEditSeed] = useState<Seed | null>(null);
  const [editFloralArrangement, setEditFloralArrangement] = useState<FloralArrangement | null>(null);
  const [editPlanter, setEditPlanter] = useState<Planter | null>(null);
  const [editTool, setEditTool] = useState<Tool | null>(null);

  useEffect(() => {
    fetchPlantsData();
    fetchSeedsData();
    fetchFloralArrangementsData();
    fetchPlantersData();
    fetchToolsData();
  }, []);

  const fetchPlantsData = async () => {
    try {
      const plantsData = await fetchPlants();
      setPlants(plantsData);
    } catch (error) {
      console.error('Error fetching plants', error);
    }
  };

  const fetchSeedsData = async () => {
    try {
      const seedsData = await fetchSeeds();
      setSeeds(seedsData);
    } catch (error) {
      console.error('Error fetching seeds', error);
    }
  };

  const fetchFloralArrangementsData = async () => {
    try {
      const floralData = await fetchFloralArrangements();
      setFloralArrangements(floralData);
    } catch (error) {
      console.error('Error fetching floral arrangements', error);
    }
  };

  const fetchPlantersData = async () => {
    try {
      const plantersData = await fetchPlanters();
      setPlanters(plantersData);
    } catch (error) {
      console.error('Error fetching planters', error);
    }
  };

  const fetchToolsData = async () => {
    try {
      const toolsData = await fetchTools();
      setTools(toolsData);
    } catch (error) {
      console.error('Error fetching tools', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  };

  const handleSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSeed({ ...newSeed, [e.target.name]: e.target.value });
  };

  const handleFloralArrangementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFloralArrangement({ ...newFloralArrangement, [e.target.name]: e.target.value });
  };

  const handlePlanterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlanter({ ...newPlanter, [e.target.name]: e.target.value });
  };

  const handleToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTool({ ...newTool, [e.target.name]: e.target.value });
  };

  const handleAddPlant = async () => {
    try {
      await addPlant(newPlant as Omit<Plant, 'pkPlanta'>);
      fetchPlantsData();
    } catch (error) {
      console.error('Error adding plant', error);
    }
  };

  const handleAddSeed = async () => {
    try {
      await addSeed(newSeed as Omit<Seed, 'pkSeed'>);
      fetchSeedsData();
    } catch (error) {
      console.error('Error adding seed', error);
    }
  };

  const handleAddFloralArrangement = async () => {
    try {
      await addFloralArrangement(newFloralArrangement as Omit<FloralArrangement, 'pkArreglo'>);
      fetchFloralArrangementsData();
    } catch (error) {
      console.error('Error adding floral arrangement', error);
    }
  };

  const handleAddPlanter = async () => {
    try {
      await addPlanter(newPlanter as Omit<Planter, 'pkJardinera'>);
      fetchPlantersData();
    } catch (error) {
      console.error('Error adding planter', error);
    }
  };

  const handleAddTool = async () => {
    try {
      await addTool(newTool as Omit<Tool, 'pkHerramienta'>);
      fetchToolsData();
    } catch (error) {
      console.error('Error adding tool', error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editPlant) {
      setEditPlant({ ...editPlant, [e.target.name]: e.target.value });
    }
  };

  const handleEditSeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editSeed) {
      setEditSeed({ ...editSeed, [e.target.name]: e.target.value });
    }
  };

  const handleEditFloralArrangementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFloralArrangement) {
      setEditFloralArrangement({ ...editFloralArrangement, [e.target.name]: e.target.value });
    }
  };

  const handleEditPlanterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editPlanter) {
      setEditPlanter({ ...editPlanter, [e.target.name]: e.target.value });
    }
  };

  const handleEditToolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editTool) {
      setEditTool({ ...editTool, [e.target.name]: e.target.value });
    }
  };

  const handleUpdatePlant = async () => {
    if (editPlant) {
      try {
        await updatePlant(editPlant.pkPlanta, editPlant);
        setEditPlant(null);
        fetchPlantsData();
      } catch (error) {
        console.error('Error updating plant', error);
      }
    }
  };

  const handleUpdateSeed = async () => {
    if (editSeed) {
      try {
        await updateSeed(editSeed.pkSeed, editSeed);
        setEditSeed(null);
        fetchSeedsData();
      } catch (error) {
        console.error('Error updating seed', error);
      }
    }
  };

  const handleUpdateFloralArrangement = async () => {
    if (editFloralArrangement) {
      try {
        await updateFloralArrangement(editFloralArrangement.pkArreglo, editFloralArrangement);
        setEditFloralArrangement(null);
        fetchFloralArrangementsData();
      } catch (error) {
        console.error('Error updating floral arrangement', error);
      }
    }
  };

  const handleUpdatePlanter = async () => {
    if (editPlanter) {
      try {
        await updatePlanter(editPlanter.pkJardinera, editPlanter);
        setEditPlanter(null);
        fetchPlantersData();
      } catch (error) {
        console.error('Error updating planter', error);
      }
    }
  };

  const handleUpdateTool = async () => {
    if (editTool) {
      try {
        await updateTool(editTool.pkHerramienta, editTool);
        setEditTool(null);
        fetchToolsData();
      } catch (error) {
        console.error('Error updating tool', error);
      }
    }
  };

  const handleDeletePlant = async (id: number) => {
    try {
      await deletePlant(id);
      fetchPlantsData();
    } catch (error) {
      console.error('Error deleting plant', error);
    }
  };

  const handleDeleteSeed = async (id: number) => {
    try {
      await deleteSeed(id);
      fetchSeedsData();
    } catch (error) {
      console.error('Error deleting seed', error);
    }
  };

  const handleDeleteFloralArrangement = async (id: number) => {
    try {
      await deleteFloralArrangement(id);
      fetchFloralArrangementsData();
    } catch (error) {
      console.error('Error deleting floral arrangement', error);
    }
  };

  const handleDeletePlanter = async (id: number) => {
    try {
      await deletePlanter(id);
      fetchPlantersData();
    } catch (error) {
      console.error('Error deleting planter', error);
    }
  };

  const handleDeleteTool = async (id: number) => {
    try {
      await deleteTool(id);
      fetchToolsData();
    } catch (error) {
      console.error('Error deleting tool', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Admin Dashboard</Typography>
      {/* Plant Management */}
      <Box mt={2}>
        <Typography variant="h6">Add New Plant</Typography>
        <TextField name="nombre" label="Nombre" onChange={handleChange} />
        <TextField name="tipo" label="Tipo" onChange={handleChange} />
        <TextField name="categoria" label="Categoria" onChange={handleChange} />
        <TextField name="descripcion" label="Descripcion" onChange={handleChange} />
        <TextField name="precio" label="Precio" type="number" onChange={handleChange} />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddPlant}>Add Plant</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Plants List</Typography>
        <Grid container spacing={2}>
          {plants.map((plant) => (
            <Grid item key={plant.pkPlanta}>
              <Typography>{plant.nombre}</Typography>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeletePlant(plant.pkPlanta)}>Delete</Button>
              <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setEditPlant(plant)}>Edit</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {editPlant && (
        <Box mt={2}>
          <Typography variant="h6">Edit Plant</Typography>
          <TextField name="nombre" label="Nombre" value={editPlant.nombre} onChange={handleEditChange} />
          <TextField name="tipo" label="Tipo" value={editPlant.tipo} onChange={handleEditChange} />
          <TextField name="categoria" label="Categoria" value={editPlant.categoria} onChange={handleEditChange} />
          <TextField name="descripcion" label="Descripcion" value={editPlant.descripcion} onChange={handleEditChange} />
          <TextField name="precio" label="Precio" type="number" value={editPlant.precio} onChange={handleEditChange} />
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdatePlant}>Update Plant</Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setEditPlant(null)}>Cancel</Button>
        </Box>
      )}

      {/* Seed Management */}
      <Box mt={2}>
        <Typography variant="h6">Add New Seed</Typography>
        <TextField name="nombre" label="Nombre" onChange={handleSeedChange} />
        <TextField name="tipo" label="Tipo" onChange={handleSeedChange} />
        <TextField name="categoria" label="Categoria" onChange={handleSeedChange} />
        <TextField name="descripcion" label="Descripcion" onChange={handleSeedChange} />
        <TextField name="precio" label="Precio" type="number" onChange={handleSeedChange} />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddSeed}>Add Seed</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Seeds List</Typography>
        <Grid container spacing={2}>
          {seeds.map((seed) => (
            <Grid item key={seed.pkSeed}>
              <Typography>{seed.nombre}</Typography>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteSeed(seed.pkSeed)}>Delete</Button>
              <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setEditSeed(seed)}>Edit</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {editSeed && (
        <Box mt={2}>
          <Typography variant="h6">Edit Seed</Typography>
          <TextField name="nombre" label="Nombre" value={editSeed.nombre} onChange={handleEditSeedChange} />
          <TextField name="tipo" label="Tipo" value={editSeed.tipo} onChange={handleEditSeedChange} />
          <TextField name="categoria" label="Categoria" value={editSeed.categoria} onChange={handleEditSeedChange} />
          <TextField name="descripcion" label="Descripcion" value={editSeed.descripcion} onChange={handleEditSeedChange} />
          <TextField name="precio" label="Precio" type="number" value={editSeed.precio} onChange={handleEditSeedChange} />
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdateSeed}>Update Seed</Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setEditSeed(null)}>Cancel</Button>
        </Box>
      )}

      {/* Floral Arrangement Management */}
      <Box mt={2}>
        <Typography variant="h6">Add New Floral Arrangement</Typography>
        <TextField name="nombre" label="Nombre" onChange={handleFloralArrangementChange} />
        <TextField name="categoria" label="Categoria" onChange={handleFloralArrangementChange} />
        <TextField name="flores" label="Flores" onChange={handleFloralArrangementChange} />
        <TextField name="descripcion" label="Descripcion" onChange={handleFloralArrangementChange} />
        <TextField name="precio" label="Precio" type="number" onChange={handleFloralArrangementChange} />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddFloralArrangement}>Add Floral Arrangement</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Floral Arrangements List</Typography>
        <Grid container spacing={2}>
          {floralArrangements.map((floral) => (
            <Grid item key={floral.pkArreglo}>
              <Typography>{floral.nombre}</Typography>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteFloralArrangement(floral.pkArreglo)}>Delete</Button>
              <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setEditFloralArrangement(floral)}>Edit</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {editFloralArrangement && (
        <Box mt={2}>
          <Typography variant="h6">Edit Floral Arrangement</Typography>
          <TextField name="nombre" label="Nombre" value={editFloralArrangement.nombre} onChange={handleEditFloralArrangementChange} />
          <TextField name="categoria" label="Categoria" value={editFloralArrangement.categoria} onChange={handleEditFloralArrangementChange} />
          <TextField name="flores" label="Flores" value={editFloralArrangement.flores} onChange={handleEditFloralArrangementChange} />
          <TextField name="descripcion" label="Descripcion" value={editFloralArrangement.descripcion} onChange={handleEditFloralArrangementChange} />
          <TextField name="precio" label="Precio" type="number" value={editFloralArrangement.precio} onChange={handleEditFloralArrangementChange} />
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdateFloralArrangement}>Update Floral Arrangement</Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setEditFloralArrangement(null)}>Cancel</Button>
        </Box>
      )}

      {/* Planter Management */}
      <Box mt={2}>
        <Typography variant="h6">Add New Planter</Typography>
        <TextField name="nombre" label="Nombre" onChange={handlePlanterChange} />
        <TextField name="categoria" label="Categoria" onChange={handlePlanterChange} />
        <TextField name="tipo" label="Tipo" onChange={handlePlanterChange} />
        <TextField name="material" label="Material" onChange={handlePlanterChange} />
        <TextField name="descripcion" label="Descripcion" onChange={handlePlanterChange} />
        <TextField name="precio" label="Precio" type="number" onChange={handlePlanterChange} />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddPlanter}>Add Planter</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Planters List</Typography>
        <Grid container spacing={2}>
          {planters.map((planter) => (
            <Grid item key={planter.pkJardinera}>
              <Typography>{planter.nombre}</Typography>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeletePlanter(planter.pkJardinera)}>Delete</Button>
              <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setEditPlanter(planter)}>Edit</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {editPlanter && (
        <Box mt={2}>
          <Typography variant="h6">Edit Planter</Typography>
          <TextField name="nombre" label="Nombre" value={editPlanter.nombre} onChange={handleEditPlanterChange} />
          <TextField name="categoria" label="Categoria" value={editPlanter.categoria} onChange={handleEditPlanterChange} />
          <TextField name="tipo" label="Tipo" value={editPlanter.tipo} onChange={handleEditPlanterChange} />
          <TextField name="material" label="Material" value={editPlanter.material} onChange={handleEditPlanterChange} />
          <TextField name="descripcion" label="Descripcion" value={editPlanter.descripcion} onChange={handleEditPlanterChange} />
          <TextField name="precio" label="Precio" type="number" value={editPlanter.precio} onChange={handleEditPlanterChange} />
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdatePlanter}>Update Planter</Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setEditPlanter(null)}>Cancel</Button>
        </Box>
      )}

      {/* Tool Management */}
      <Box mt={2}>
        <Typography variant="h6">Add New Tool</Typography>
        <TextField name="nombre" label="Nombre" onChange={handleToolChange} />
        <TextField name="categoria" label="Categoria" onChange={handleToolChange} />
        <TextField name="tamaño" label="Tamaño" onChange={handleToolChange} />
        <TextField name="material" label="Material" onChange={handleToolChange} />
        <TextField name="descripcion" label="Descripcion" onChange={handleToolChange} />
        <TextField name="precio" label="Precio" type="number" onChange={handleToolChange} />
        <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleAddTool}>Add Tool</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Tools List</Typography>
        <Grid container spacing={2}>
          {tools.map((tool) => (
            <Grid item key={tool.pkHerramienta}>
              <Typography>{tool.nombre}</Typography>
              <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteTool(tool.pkHerramienta)}>Delete</Button>
              <Button variant="contained" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setEditTool(tool)}>Edit</Button>
            </Grid>
          ))}
        </Grid>
      </Box>
      {editTool && (
        <Box mt={2}>
          <Typography variant="h6">Edit Tool</Typography>
          <TextField name="nombre" label="Nombre" value={editTool.nombre} onChange={handleEditToolChange} />
          <TextField name="categoria" label="Categoria" value={editTool.categoria} onChange={handleEditToolChange} />
          <TextField name="tamaño" label="Tamaño" value={editTool.tamaño} onChange={handleEditToolChange} />
          <TextField name="material" label="Material" value={editTool.material} onChange={handleEditToolChange} />
          <TextField name="descripcion" label="Descripcion" value={editTool.descripcion} onChange={handleEditToolChange} />
          <TextField name="precio" label="Precio" type="number" value={editTool.precio} onChange={handleEditToolChange} />
          <Button variant="contained" style={{ backgroundColor: 'green', color: 'white' }} onClick={handleUpdateTool}>Update Tool</Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setEditTool(null)}>Cancel</Button>
        </Box>
      )}
    </Container>
  );
};

export default AdminView;
