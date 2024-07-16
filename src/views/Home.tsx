// src/views/Home.tsx
import React from 'react';
import Slider from 'react-slick';
import { Typography, Box, Container, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import '../assets/styles/Home.css';
import NewsAndWeather from './NewsAndWeather';

//Plantas
import plantasDeInterior from '../assets/img/inicio/plantas/plantas_de_interior.png';
import plantasDeExterior from '../assets/img/inicio/plantas/plantas_de_exterior.png';
import plantasDeJardin from '../assets/img/inicio/plantas/plantas_de_jardin.png';
import plantasDeHuerto from '../assets/img/inicio/plantas/plantas_de_huerto.png';

//Semillas
import semillasHortalizas from '../assets/img/inicio/semillas/semillas_hortalizas.png';
import semillasHierbasAromaticas from '../assets/img/inicio/semillas/hierbas_aromaticas.png';
import semillasFlores from '../assets/img/inicio/semillas/semillas_flores.png';
import semillasArbolesFrutales from '../assets/img/inicio/semillas/semillas_arboles_frutales.png';

//Jardineras y Macetas
import macetasInterior from '../assets/img/inicio/jardineras_macetas/macetas_interior.png';
import jardinerasExterior from '../assets/img/inicio/jardineras_macetas/jardineras_exterior.png';
import macetasEspeciales from '../assets/img/inicio/jardineras_macetas/macetas_especiales.png';
import materialesEspecificos from '../assets/img/inicio/jardineras_macetas/macetas_especificas.png';

//Arreglos florales
import arreglosFloresFrescas from '../assets/img/inicio/arreglos_florales/arreglos_flores_frescas.png';
import arreglosFloralesEventos from '../assets/img/inicio/arreglos_florales/arreglos_para_eventos.png';
import cestasCajasFlores from '../assets/img/inicio/arreglos_florales/cestas_cajas_flores.png';
import floresPreservadasSecas from '../assets/img/inicio/arreglos_florales/flores_preservadas_secas.png';

//Herramientas de Jardinería
import herramientasExcavacion from '../assets/img/inicio/herramientas_jardineria/herramientas_excavacion.png';
import herramientasPoda from '../assets/img/inicio/herramientas_jardineria/herramientas_poda.png';
import herramientasRiego from '../assets/img/inicio/herramientas_jardineria/herramientas_riego.png';
import herramientasCultivo from '../assets/img/inicio/herramientas_jardineria/herramientas_cultivo.png';

const sections = [
  {
    title: 'Plantas',
    items: [
      { title: 'Plantas de interior', image: plantasDeInterior },
      { title: 'Plantas de exterior', image: plantasDeExterior },
      { title: 'Plantas de jardín', image: plantasDeJardin },
      { title: 'Plantas de huerto', image: plantasDeHuerto },
    ],
    link: '/plants'
  },
  {
    title: 'Semillas',
    items: [
      { title: 'Semillas de Hortalizas', image: semillasHortalizas },
      { title: 'Semillas de hierbas aromáticas', image: semillasHierbasAromaticas },
      { title: 'Semillas de flores', image: semillasFlores },
      { title: 'Semillas de árboles frutales', image: semillasArbolesFrutales },
    ],
    link: '/seeds'
  },
  {
    title: 'Jardineras y Macetas',
    items: [
      { title: 'Macetas de interior', image: macetasInterior },
      { title: 'Jardineras de exterior', image: jardinerasExterior },
      { title: 'Macetas especiales', image: macetasEspeciales },
      { title: 'Materiales especificos', image: materialesEspecificos },
    ],
    link: '/planters-and-pots'
  },
  {
    title: 'Arreglos Florales',
    items: [
      { title: 'Arreglos de flores frescas', image: arreglosFloresFrescas },
      { title: 'Arreglos florales para eventos', image: arreglosFloralesEventos },
      { title: 'Cestas y cajas de flores', image: cestasCajasFlores },
      { title: 'Flores preservadas y secas', image: floresPreservadasSecas },
    ],
    link: '/floral-arrangements'
  },
  {
    title: 'Herramientas de Jardinería',
    items: [
      { title: 'Herramientas de excavación', image: herramientasExcavacion },
      { title: 'Herramientas de poda', image: herramientasPoda },
      { title: 'Herramientas de riego', image: herramientasRiego },
      { title: 'Herramientas de cultivo', image: herramientasCultivo },
    ],
    link: '/gardening-tools'
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
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <Slider {...settings} className="slick-slider">
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
        <div className="slider-item">
          <Box className="slider-content">
            <Typography variant="h3" className="slider-title">
              Nueva colección de plantas
            </Typography>
            <Typography variant="h6" className="slider-subtitle">
              Descubre nuestras nuevas variedades
            </Typography>
            <Typography variant="body2" className="slider-note">
              * Promoción válida hasta agotar existencias
            </Typography>
          </Box>
        </div>
      </Slider>

      <Container className="homeSections-container">
        {sections.map((section) => (
          <Box key={section.title} className="homeSections-section">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h4">{section.title}</Typography>
              <Link component={RouterLink} to={section.link} className="viewAll-link">
                <Box className="viewAll-button">
                  Ver todo
                </Box>
              </Link>
            </Box>
            <Grid container spacing={2}>
              {section.items.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.title}>
                  <Card className="homeSections-card">
                    <CardMedia component="img" height="150" image={item.image} alt={item.title} />
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

      <NewsAndWeather />
    </div>
  );
};

export default Home;
