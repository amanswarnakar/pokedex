import React, { useEffect, useState, useContext } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

// Pages
import Pokedex from './pages/Pokedex';
import Pokemon from './pages/Pokemon';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" exact index element={<Navigate to='/pokedex'/>} />
            <Route path="/pokedex" exact index element={<Pokedex />} />
            <Route path="/pokemon/:id" exact index element={<Pokemon />} />
          </Routes>		
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
