import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography } from '@mui/material';
import { fetchTools, Tool } from '../services/apiService';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

interface ToolWithImage extends Tool {
  imageUrl?: string;
}

const GardeningToolsView: React.FC = () => {
  const [tools, setTools] = useState<ToolWithImage[]>([]);
  const { addToCart } = useCart(); // Use the cart context

  useEffect(() => {
    fetchToolsData();
  }, []);

  const fetchToolsData = async () => {
    try {
      const toolsData = await fetchTools();
      const toolsWithImages = await Promise.all(toolsData.map(async (tool) => {
        const imageUrl = await fetchImageFromUnsplash(tool.nombre);
        return { ...tool, imageUrl };
      }));
      setTools(toolsWithImages);
    } catch (error) {
      console.error('Error fetching tools', error);
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

  const handleAddToCart = (tool: ToolWithImage) => {
    addToCart({
      id: tool.pkHerramienta,
      name: tool.nombre,
      price: tool.precio,
      quantity: 1,
      imageUrl: tool.imageUrl, // Add imageUrl to the cart item
    });
  };

  return (
    <Container className="toolsView-container">
      <Typography variant="h4" gutterBottom>Herramientas de Jardinería Disponibles</Typography>
      <Grid container spacing={4}>
        {tools.map((tool) => (
          <Grid item xs={12} sm={6} md={3} key={tool.pkHerramienta}>
            <Card className="toolsView-card">
              {tool.imageUrl && (
                <CardMedia
                  component="img"
                  alt={tool.nombre}
                  height="140"
                  image={tool.imageUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{tool.nombre}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Categoria:</strong> {tool.categoria}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Tamaño:</strong> {tool.tamaño}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Material:</strong> {tool.material}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Descripción:</strong> {tool.descripcion}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${tool.precio}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleAddToCart(tool)}>Agregar al carrito</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GardeningToolsView;
