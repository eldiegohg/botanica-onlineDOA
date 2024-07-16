import React from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useCart } from '../context/CartContext';
import { PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import '../assets/styles/cartStyles.css'; 

const CartView: React.FC = () => {
  const { cart, removeFromCart, decreaseQuantity, clearCart, increaseQuantity } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const createOrder: PayPalButtonsComponentProps['createOrder'] = (data, actions) => {
    if (!actions.order) return Promise.reject();
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: totalPrice,
        },
      }],
      intent: 'CAPTURE'
    });
  };

  const onApprove: PayPalButtonsComponentProps['onApprove'] = (data, actions) => {
    if (!actions.order) return Promise.reject();
    return actions.order.capture().then((details) => {
      const payerName = details.payer?.name?.given_name;
      alert(`Transaction completed by ${payerName}`);
      clearCart();
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      <Typography variant="h6" gutterBottom>Total de productos: {totalQuantity}</Typography>
      <Typography variant="h6" gutterBottom>Precio Total: ${totalPrice}</Typography>
      <Grid container spacing={4}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card>
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  alt={item.name}
                  height="140"
                  image={item.imageUrl}
                />
              )}
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Precio:</strong> ${item.price}</Typography>
                <Typography variant="body2" color="textSecondary"><strong>Cantidad:</strong> {item.quantity}</Typography>
                <div className="button-container">
                  <Button 
                    variant="contained" 
                    className="decrease-button" 
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    Disminuir Cantidad
                  </Button>
                  <Button 
                    variant="contained" 
                    className="increase-button" 
                    onClick={() => increaseQuantity(item.id)}
                  >
                    Aumentar Cantidad
                  </Button>
                  <Button 
                    variant="contained" 
                    className="remove-button" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px' }}>
        <PayPalButtons 
          createOrder={createOrder} 
          onApprove={onApprove} 
        />
      </div>
    </Container>
  );
};

export default CartView;
