import React from 'react';
import { Container, Button } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleOverview from './components/VehicleOverview.tsx';
import AddVehicleForm from './components/AddVehicleForm.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';

const App = () => {
  return (
    <Router>
      <Header/>
      <Container>
        <Routes>
          <Route path="/" element={<VehicleOverview />} />
          <Route path="/add" element={<AddVehicleForm />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
};

export default App;
