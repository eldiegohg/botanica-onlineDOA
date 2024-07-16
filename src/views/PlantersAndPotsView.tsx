import React, { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { fetchPlanters, Planter } from '../services/apiService';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import '../assets/styles/PlantersAndPotsView.css'; // Asegúrate de importar el CSS

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

interface PlanterWithImage extends Planter {
  imageUrl?: string;
}

const PlantersAndPotsView: React.FC = () => {
  const [planters, setPlanters] = useState<PlanterWithImage[]>([]);
  const { addToCart } = useCart(); // Use the cart context

  const fetchPlantersData = useCallback(async () => {
    try {
      const plantersData = await fetchPlanters();
      console.log('Planters data:', plantersData); // Verifica los datos aquí
      const plantersWithImages = await Promise.all(plantersData.map(async (planter) => {
        const imageUrl = await fetchImageFromUnsplash(planter.nombre);
        return { ...planter, imageUrl };
      }));
      setPlanters(plantersWithImages);
    } catch (error) {
      console.error('Error fetching planters', error);
    }
  }, []);

  useEffect(() => {
    fetchPlantersData();
  }, [fetchPlantersData]);

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

  const handleAddToCart = (planter: PlanterWithImage) => {
    addToCart({
      id: planter.pkJardinera,
      name: planter.nombre,
      price: planter.precio,
      quantity: 1,
      imageUrl: planter.imageUrl, // Add imageUrl to the cart item
    });
  };

  return (
    <Container className="plantersAndPotsView-container">
      <Typography variant="h4" gutterBottom>Jardineras y Macetas Disponibles</Typography>
      <Grid container spacing={4}>
        {planters.length > 0 ? (
          planters.map((planter) => (
            <Grid item xs={12} sm={6} md={3} key={planter.pkJardinera}>
              <Card className="plantersAndPotsView-card">
                {planter.imageUrl && (
                  <CardMedia
                    component="img"
                    alt={planter.nombre}
                    height="140"
                    image={planter.imageUrl}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">{planter.nombre}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Tipo:</strong> {planter.tipo}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Categoria:</strong> {planter.categoria}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Material:</strong> {planter.material}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Descripción:</strong> {planter.descripcion}</Typography>
                  <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${planter.precio}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    className="plantersAndPotsView-addToCartButton"
                    onClick={() => handleAddToCart(planter)}
                  >
                    Agregar al carrito
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No hay jardineras disponibles en este momento.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default PlantersAndPotsView;
