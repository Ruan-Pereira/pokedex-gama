import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/home';
import Product from './pages/product';
import Header from './components/Header';
import Minicart from './components/Minicart';
import { Storage } from './StoreContext';

import './App.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Storage>
        <Minicart />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:product/p" element={<Product />} />
        </Routes>
      </Storage>
    </BrowserRouter>
  );
}
