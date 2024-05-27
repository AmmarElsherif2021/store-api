import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import ProductPage from './components/ProductPage/ProductPage';
import Main from './layout/Main/Main';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Main />}>

          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
