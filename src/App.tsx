import React from 'react';
import Header from './views/Header';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import Home from './views/Home';


function App() {
  return (
    <div className="App">
      <Header />
      <LoginView />
      <RegisterView />
      <Home />
      {/* Otros componentes y contenido */}
    </div>
  );
}

export default App;