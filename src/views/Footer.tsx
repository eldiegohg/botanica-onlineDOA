import React from 'react';
import { Box, Typography } from '@mui/material';
import '../assets/styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" align="center" className="footer-text">
        © 2024 Botánica Online. Todos los derechos reservados.
      </Typography><br></br>
      <Typography variant="body2" align="center" className="footer-text">
        El uso de este sitio está sujeto a ciertos términos de uso que requieren un acuerdo legal entre Usted y Botánica Online S.A. de C.V.
      </Typography><br></br>
      <Typography variant="body2" align="center" className="footer-text">
        CONTÁCTANOS
      </Typography>
      <Typography variant="body2" align="center" className="footer-text">
        Teléfono: 9981550078
      </Typography>
      <Typography variant="body2" align="center" className="footer-text">
        Correo: botanicaonline@gmail.com
      </Typography>
    </Box>
  );
};

export default Footer;
