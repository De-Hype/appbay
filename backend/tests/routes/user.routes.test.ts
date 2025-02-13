import express from 'express';
import request from 'supertest';
import userRoutes from '../../src/routes/user.routes';

describe('User Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/v1/api', userRoutes);
  });

  describe('POST /v1/api/users', () => {
    

    it('should have the correct full path', async () => {
      const response = await request(app)
        .post('/v1/api/users')
        .send({}); 
      
      expect(response.status).not.toBe(404);
    });
  });

  describe('GET /v1/api/users', () => {
    it('should have the correct full path', async () => {
      const response = await request(app)
        .get('/v1/api/users');
      
      expect(response.status).not.toBe(404);
    });
  });

  describe('GET /v1/api/users/:id', () => {
    it('should have the correct full path', async () => {
      const response = await request(app)
        .get('/v1/api/users/1');
      
      expect(response.status).not.toBe(404); 
    });
  });

  describe('PUT /v1/api/users/:id', () => {
    it('should have the correct full path', async () => {
      const response = await request(app)
        .put('/v1/api/users/1')
        .send({});  
      
      expect(response.status).not.toBe(404); 
    });
  });

  describe('DELETE /v1/api/users/:id', () => {
    it('should have the correct full path', async () => {
      const response = await request(app)
        .delete('/v1/api/users/1');
      
      expect(response.status).not.toBe(404);
    });
  });
});
