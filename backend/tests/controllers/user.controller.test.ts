import { Request, Response, NextFunction } from 'express';
import { User } from '../../src/models/user.model';
import { Log } from '../../src/models/log.model';
import AppError from '../../src/errors/AppError';
import * as userController from '../../src/controllers/user.controller';


jest.mock('../../src/models/user.model');
jest.mock('../../src/models/log.model');
jest.mock('../../src/helpers/logAction');

describe('User Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {},
      query: {},
      params: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createUserHandler', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        location: 'Test Location',
        role: 'user'
      };
      mockRequest.body = userData;

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(userData);
      (Log.create as jest.Mock).mockResolvedValue({ ...userData, id: 1 });

      await userController.createUserHandler(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(User.create).toHaveBeenCalledWith(userData);
    
    });

    it('should return error if user already exists', async () => {
      mockRequest.body = {
        email: 'existing@example.com'
      };

      (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });

      await userController.createUserHandler(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(
        expect.any(AppError)
      );
    });
  });

  describe('fetchUsersHandler', () => {
    it('should fetch users with pagination', async () => {
      mockRequest.query = {
        page: '1',
        limit: '10'
      };

      const mockUsers = {
        count: 2,
        rows: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' }
        ]
      };

      (User.findAndCountAll as jest.Mock).mockResolvedValue(mockUsers);

      await userController.fetchUsersHandler(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(User.findAndCountAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});