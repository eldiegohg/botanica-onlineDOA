import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { fetchPlants, Plant } from '../services/apiService';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../assets/styles/PlantsView.css'; // Asegúrate de importar el CSS

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

interface PlantWithImage extends Plant {
  imageUrl?: string;
}

const PlantsView: React.FC = () => {
  const [plants, setPlants] = useState<PlantWithImage[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPlantsData();
  }, []);

  const fetchPlantsData = async () => {
    try {
      const plantsData = await fetchPlants();
      const plantsWithImages = await Promise.all(plantsData.map(async (plant) => {
        const imageUrl = await fetchImageFromUnsplash(plant.nombre);
        return { ...plant, imageUrl };
      }));
      setPlants(plantsWithImages);
    } catch (error) {
      console.error('Error fetching plants', error);
    }
  };

  const fetchImageFromUnsplash = async (query: string): Promise<string | undefined> => {
    try {
      const response = await axios.get(UNSPLASH_API_URL, {
        params: { query, client_id: UNSPLASH_ACCESS_KEY, per_page: 1 },
      });
      if (response.data.results && response.data.results.length > 0) {
        return response.data.results[0].urls.small;
      }
    } catch (error) {
      console.error('Error fetching image from Unsplash', error);
    }
    return undefined;
  };

  const handleAddToCart = (plant: PlantWithImage) => {
    addToCart({
      id: plant.pkPlanta,
      name: plant.nombre,
      price: plant.precio,
      quantity: 1,
      imageUrl: plant.imageUrl, // Agregar URL de imagen
    });
  };

  return (
    <Container className="plantsView-container">
      <Typography variant="h4" gutterBottom>Plantas Disponibles</Typography>
      <Grid container spacing={4}>
        {plants.map((plant) => (
          <Grid item xs={12} sm={6} md={3} key={plant.pkPlanta}>
            <Card className="plantsView-card">
              {plant.imageUrl && (
                <CardMedia
                  component="img"
                  alt={plant.nombre}
                  height="140"
                  image={plant.imageUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{plant.nombre}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Tipo:</strong> {plant.tipo}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Categoria:</strong> {plant.categoria}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Descripción:</strong> {plant.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${plant.precio}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  className="plantsView-addToCartButton"
                  onClick={() => handleAddToCart(plant)}
                >
                  Agregar al carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlantsView;
