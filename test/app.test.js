import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('GET /blockchain', () => {
  it('returnerar kedjan med ett genesis block', async () => {
    const res = await request(app).get('/blockchain');
    expect(res.status).toBe(200);
    expect(res.body.chain).toHaveLength(1);
  });
});

describe('POST /transactions', () => {
  it('lägger till en giltig transaktion till den väntande poolen', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 1, weightKg: 25 });

    expect(res.status).toBe(201);
    expect(res.body.batchId).toBe(1);
  });

  it('avbryter när en transaktion saknar nödvändiga fält', async () => {
    const res = await request(app)
      .post('/transactions')
      .send({ sender: 'Bondgård A' });

    expect(res.status).toBe(400);
  });
});

describe('POST /mine', () => {
  it('minar väntande transaktioner till en ny block', async () => {
    await request(app)
      .post('/transactions')
      .send({ sender: 'Bondgård A', recipient: 'Rosteri B', batchId: 2, weightKg: 30 });

    const res = await request(app).post('/mine');

    expect(res.status).toBe(201);
    expect(res.body.transactions.some((t) => t.batchId === 2)).toBe(true);
  });

  it('avbryter mining när det inte finns några väntande transaktioner', async () => {
    const freshApp = createApp();
    const res = await request(freshApp).post('/mine');
    expect(res.status).toBe(400);
  });
});
