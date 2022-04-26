import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProductList from './ProductList.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductImage from './ProductImage.jsx';

const NotFound = () => <h1>Page Not Found</h1>;

const Routed = () => (
  <Routes>
    <Route path="/" element={<Navigate replace to="/products" />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="/edit/:id" element={<ProductEdit />} />
    <Route path="/img/:id" element={<ProductImage />} />
    <Route component={NotFound} />
  </Routes>
);

export default Routed;
