import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPlants, fetchSeeds, fetchFloralArrangements, fetchPlanters, fetchTools, Plant, Seed, FloralArrangement, Planter, Tool } from '../services/apiService';
import '../assets/styles/SearchResults.css'; // Asegúrate de importar el CSS

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query') || '';
  const [results, setResults] = useState<(Plant | Seed | FloralArrangement | Planter | Tool)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plants, seeds, floralArrangements, planters, tools] = await Promise.all([
          fetchPlants(),
          fetchSeeds(),
          fetchFloralArrangements(),
          fetchPlanters(),
          fetchTools(),
        ]);
        const combinedResults = [...plants, ...seeds, ...floralArrangements, ...planters, ...tools];
        const filteredResults = combinedResults.filter(item =>
          item.nombre.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [query]);

  const getItemRoute = (item: Plant | Seed | FloralArrangement | Planter | Tool): string => {
    if ('pkPlanta' in item) {
      return '/plants';
    } else if ('pkSeed' in item) {
      return '/seeds';
    } else if ('pkArreglo' in item) {
      return '/floral-arrangements';
    } else if ('pkJardinera' in item) {
      return '/planters-and-pots';
    } else if ('pkHerramienta' in item) {
      return '/gardening-tools';
    }
    return '';
  };

  const getButtonText = (item: Plant | Seed | FloralArrangement | Planter | Tool): string => {
    if ('pkPlanta' in item) {
      return 'Ver Planta';
    } else if ('pkSeed' in item) {
      return 'Ver Semilla';
    } else if ('pkArreglo' in item) {
      return 'Ver Arreglo Floral';
    } else if ('pkJardinera' in item) {
      return 'Ver Jardinera o Maceta';
    } else if ('pkHerramienta' in item) {
      return 'Ver Herramienta';
    }
    return '';
  };

  return (
    <Container className="searchResults-container">
      <Typography variant="h4" gutterBottom className="searchResults-title">
        Resultados de búsqueda para: &quot;{query}&quot;
      </Typography>
      {results.length > 0 ? (
        <Grid container spacing={4} className="searchResults-grid">
          {results.map((result, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} className="searchResults-card">
              <Card>
                <CardContent>
                  <Typography variant="h6">{result.nombre}</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className="searchResults-button"
                    onClick={() => navigate(getItemRoute(result))}
                  >
                    {getButtonText(result)}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No se encontraron resultados.</Typography>
      )}
    </Container>
  );
};

export default SearchResults;
