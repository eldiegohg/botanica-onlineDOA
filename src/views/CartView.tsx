import React, { useContext } from 'react';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartContext } from '../context/CartContext';
import '../assets/styles/CartView.css';

const CartView: React.FC = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Container className="cartView-container">
      <Typography variant="h5" gutterBottom>Carrito de Compras</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => removeFromCart(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="cartView-summary">
        <Typography variant="h6">Resumen del pedido</Typography>
        <Typography>Subtotal: ${calculateTotal().toFixed(2)}</Typography>
        <Typography>IVA (16%): ${(calculateTotal() * 0.16).toFixed(2)}</Typography>
        <Typography>Descuentos: $0.00</Typography>
        <Typography>Total: ${(calculateTotal() * 1.16).toFixed(2)}</Typography>
        <Button variant="contained" color="primary" className="cartView-checkoutButton">
          Pagar ahora ({cartItems.length})
        </Button>
        <Typography>Aceptamos:</Typography>
        <img src="path-to-payment-icons.png" alt="Métodos de pago" />
      </Box>
    </Container>
  );
};

export default CartView;
