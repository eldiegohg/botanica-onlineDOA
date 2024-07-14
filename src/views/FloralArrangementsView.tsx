import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { fetchFloralArrangements, FloralArrangement } from '../services/apiService';
import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

interface FloralArrangementWithImage extends FloralArrangement {
  imageUrl?: string;
}

const FloralArrangementsView: React.FC = () => {
  const [floralArrangements, setFloralArrangements] = useState<FloralArrangementWithImage[]>([]);

  useEffect(() => {
    fetchFloralArrangementsData();
  }, []);

  const fetchFloralArrangementsData = async () => {
    try {
      const floralData = await fetchFloralArrangements();
      const floralWithImages = await Promise.all(floralData.map(async (floral) => {
        const imageUrl = await fetchImageFromUnsplash(floral.nombre);
        return { ...floral, imageUrl };
      }));
      setFloralArrangements(floralWithImages);
    } catch (error) {
      console.error('Error fetching floral arrangements', error);
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

  return (
    <Container className="floralArrangementsView-container">
      <Typography variant="h4" gutterBottom>Arreglos Florales Disponibles</Typography>
      <Grid container spacing={4}>
        {floralArrangements.map((floral) => (
          <Grid item xs={12} sm={6} md={3} key={floral.pkArreglo}>
            <Card className="floralArrangementsView-card">
              {floral.imageUrl && (
                <CardMedia
                  component="img"
                  alt={floral.nombre}
                  height="140"
                  image={floral.imageUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{floral.nombre}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Categoria:</strong> {floral.categoria}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Flores:</strong> {floral.flores}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Descripción:</strong> {floral.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${floral.precio}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">Agregar al carrito</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FloralArrangementsView;
