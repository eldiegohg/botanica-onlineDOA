import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import axios from 'axios';
import '../assets/styles/NewsAndWeather.css';

const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';
const UNSPLASH_ACCESS_KEY = 'X6_j0qdvnIfr365Duh2mXuetHs9s1vXNrP0v4g5KCU0';

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
        title: 'Beneficios de las plantas en el hogar',
        description: 'Las plantas no solo embellecen tu hogar, sino que también mejoran la calidad del aire y reducen el estrés.',
      },
      {
        title: 'Cómo cuidar tus plantas de interior',
        description: 'Aprende los mejores trucos para mantener tus plantas de interior saludables y vibrantes durante todo el año.',
      },
      {
        title: 'Plantas medicinales que puedes cultivar en casa',
        description: 'Descubre qué plantas medicinales puedes cultivar en tu hogar y cómo pueden mejorar tu salud.',
      }
    ];

    const fetchImages = async () => {
      const newsWithImages = await Promise.all(simulatedNews.map(async (article) => {
        const imageUrl = await fetchImageFromUnsplash(article.title);
        return { ...article, urlToImage: imageUrl };
      }));
      setNews(newsWithImages);
    };

    fetchImages();

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
