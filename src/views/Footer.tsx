import React from 'react';
import { Box, Typography } from '@mui/material';
import '../assets/styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" align="center" className="footer-text">
        © 2024 Botánica Online. Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" align="center" className="footer-text">
        El uso de este sitio está sujeto a ciertos términos de uso que requieren un acuerdo legal entre Usted y Botánica Online S.A. de C.V.
      </Typography>
    </Box>
  );
};

export default Footer;
