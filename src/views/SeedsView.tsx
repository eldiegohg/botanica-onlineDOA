import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { fetchSeeds, Seed } from '../services/apiService';
import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

interface SeedWithImage extends Seed {
  imageUrl?: string;
}

const SeedsView: React.FC = () => {
  const [seeds, setSeeds] = useState<SeedWithImage[]>([]);

  useEffect(() => {
    fetchSeedsData();
  }, []);

  const fetchSeedsData = async () => {
    try {
      const seedsData = await fetchSeeds();
      const seedsWithImages = await Promise.all(seedsData.map(async (seed) => {
        const imageUrl = await fetchImageFromUnsplash(seed.nombre);
        return { ...seed, imageUrl };
      }));
      setSeeds(seedsWithImages);
    } catch (error) {
      console.error('Error fetching seeds', error);
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
    <Container className="seedsView-container">
      <Typography variant="h4" gutterBottom>Semillas Disponibles</Typography>
      <Grid container spacing={4}>
        {seeds.map((seed) => (
          <Grid item xs={12} sm={6} md={3} key={seed.pkSeed}>
            <Card className="seedsView-card">
              {seed.imageUrl && (
                <CardMedia
                  component="img"
                  alt={seed.nombre}
                  height="140"
                  image={seed.imageUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{seed.nombre}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Tipo:</strong> {seed.tipo}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Categoria:</strong> {seed.categoria}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Descripción:</strong> {seed.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${seed.precio}</Typography>
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

export default SeedsView;
