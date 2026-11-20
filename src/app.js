'use strict';

const express = require('express');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// Invented sample data -- no real information anywhere in this project.
const products = [
  { id: 1, name: 'Notebook', price: 4.5 },
  { id: 2, name: 'Pen', price: 1.25 },
  { id: 3, name: 'Backpack', price: 32.0 },
];

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  return res.json(product);
});

module.exports = app;
