import React from 'react';
import Slider from 'react-slick';
import { Typography, Box, Container, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import '../assets/styles/Home.css';

const sections = [
  {
    title: 'Plantas',
    items: [
      { title: 'Plantas de interior', image: '../assets/img/slider.png' },
      { title: 'Plantas de exterior', image: '../assets/img/slider.png' },
      { title: 'Plantas de jardín', image: '../assets/img/slider.png' },
      { title: 'Plantas de huerto', image: '../assets/img/slider.png' },
    ],
  },
  {
    title: 'Semillas',
    items: [
      { title: 'Semillas de Hortalizas', image: '../assets/img/slider.png' },
      { title: 'Semillas de hierbas aromáticas', image: '../assets/img/slider.png' },
      { title: 'Semillas de flores', image: '../assets/img/slider.png' },
      { title: 'Semillas de árboles frutales', image: '../assets/img/slider.png' },
    ],
  },
];

const Home: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIos />,
    prevArrow: <ArrowBackIos />,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="slider-item">
          <Box className="slider-content">
            <Typography variant="h3" className="slider-title">
              ¡Envío gratis!
            </Typography>
            <Typography variant="h6" className="slider-subtitle">
              En pedidos superiores a $50.00*
            </Typography>
            <Typography variant="body2" className="slider-note">
              * Válido todo el mes de Junio de 2024
            </Typography>
          </Box>
        </div>
        {/* Puedes agregar más elementos al slider aquí */}
      </Slider>

      <Container className="homeSections-container">
        {sections.map((section) => (
          <Box key={section.title} className="homeSections-section">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4">{section.title}</Typography>
              <Link href="#" variant="body2" color="textPrimary">
                Ver todo
              </Link>
            </Box>
            <Grid container spacing={2}>
              {section.items.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Card className="homeSections-card">
                    <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                    <CardContent>
                      <Typography variant="h6">{item.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </div>
  );
};

export default Home;