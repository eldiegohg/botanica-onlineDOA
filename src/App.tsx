import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './views/Header';
import Home from './views/Home';
import Footer from './views/Footer';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import ResetPasswordView from './views/ResetPasswordView';
import ProfileView from './views/ProfileView';
import CartView from './views/CartView';
import PlantsView from './views/PlantsView';
import SeedsView from './views/SeedsView';
import FloralArrangementsView from './views/FloralArrangementsView';
import PlantersAndPotsView from './views/PlantersAndPotsView';
import GardeningToolsView from './views/GardeningToolsView';
import AdminView from './views/AdminView';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add isAdmin to the state

  const handleLogin = (admin: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(admin); // Set isAdmin state based on login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false); // Reset isAdmin state on logout
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginView handleLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/reset-password" element={<ResetPasswordView />} />
          <Route path="/plants" element={<PlantsView />} />
          <Route path="/seeds" element={<SeedsView />} />
          <Route path="/floral-arrangements" element={<FloralArrangementsView />} />
          <Route path="/planters-and-pots" element={<PlantersAndPotsView />} />
          <Route path="/gardening-tools" element={<GardeningToolsView />} />
          <Route path="/profile" element={<ProfileView />} />
          {isAdmin && <Route path="/admin" element={<AdminView />} />} {/* Conditional route for admin */}
          <Route path="/cart" element={<CartView />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
