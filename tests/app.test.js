'use strict';

const request = require('supertest');
const app = require('../src/app');

describe('ShopCart API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('GET /api/products returns a list of 3 products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(3);
  });

  test('GET /api/products/:id returns one product', async () => {
    const res = await request(app).get('/api/products/2');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Pen');
  });

  test('GET /api/products/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.statusCode).toBe(404);
  });

  test('does not leak the x-powered-by header', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
