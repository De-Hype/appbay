import express from 'express';
import request from 'supertest';
import userRoutes from '../src/routes/user.routes';
import itemRoutes from '../src/routes/item.routes';

describe('App Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/v1/api', userRoutes);
    app.use('/v1/api', itemRoutes);
  });

 

  it('should return 404 for invalid paths', async () => {
    const response = await request(app).get('/invalid/path');
    expect(response.status).toBe(404);
  });
});