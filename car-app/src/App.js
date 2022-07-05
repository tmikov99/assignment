import './App.css';
import { Routes, Route } from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import Offers from './components/Offers.js';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import OfferDetails from './components/OfferDetails';
import ResponsiveAppBar from './components/AppBar.js';
import MyOffers from './components/MyOffers';
import MyReservations from './components/MyReservations';
import { useSelector } from 'react-redux'

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar/>
      </Box>
      {isLoggedIn ? 
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="offers" element={<Offers />} />
              <Route path="offer/:id" element={<OfferDetails />} />
              <Route path="myOffers" element={<MyOffers />} />
              <Route path="myReservations" element={<MyReservations />} />
              <Route path="*" element={<Home />} /> 
            </Routes> 
            :
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="offers" element={<Offers />} />
              <Route path="*" element={<SignIn />} /> 
            </Routes>
      }
    </div>
  );
}

export default App;
