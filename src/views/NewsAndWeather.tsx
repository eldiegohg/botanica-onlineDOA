import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import '../assets/styles/NewsAndWeather.css';

interface Article {
  title: string;
  description: string;
  urlToImage?: string;
}

const NewsAndWeather: React.FC = () => {
  const [news, setNews] = useState<Article[]>([]);
  const [weather, setWeather] = useState<number | null>(null);

  useEffect(() => {
    // Simulated Fetch news data
    const simulatedNews = [
      {
        title: 'Beneficios de las Plantas en el Hogar',
        description: 'Las plantas no solo embellecen tu hogar, sino que también mejoran la calidad del aire y reducen el estrés.',
        urlToImage: 'https://example.com/imagen1.jpg'
      },
      {
        title: 'Cómo Cuidar tus Plantas de Interior',
        description: 'Aprende los mejores trucos para mantener tus plantas de interior saludables y vibrantes durante todo el año.',
        urlToImage: 'https://example.com/imagen2.jpg'
      },
      {
        title: 'Plantas Medicinales que Puedes Cultivar en Casa',
        description: 'Descubre qué plantas medicinales puedes cultivar en tu hogar y cómo pueden mejorar tu salud.',
        urlToImage: 'https://example.com/imagen3.jpg'
      }
    ];
    setNews(simulatedNews);

    // Fetch weather data
    fetch('https://api.open-meteo.com/v1/forecast?latitude=21.1619&longitude=-86.8515&hourly=temperature_2m')
      .then(response => response.json())
      .then(data => {
        if (data.hourly && data.hourly.temperature_2m) {
          setWeather(data.hourly.temperature_2m[0]);
        } else {
          console.error('Error fetching weather data:', data);
        }
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <Container className="newsWeather-container">
      <Typography variant="h4" gutterBottom className="section-title">Noticias</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {news.map((article, index) => (
            <Card key={index} className="news-card">
              <CardMedia
                component="img"
                height="140"
                image={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.title}
              />
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">{article.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          {weather !== null && (
            <Box className="weather-widget">
              <Typography variant="h6">Cancún</Typography>
              <Typography variant="h4">{weather}°C</Typography>
              <Typography variant="body2">Temperatura actual</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsAndWeather;
