import { Request, Response, NextFunction } from 'express';
import { Item } from '../../src/models/item.model';
import * as itemController from '../../src/controllers/item.controller';

jest.mock('../../src/models/item.model');
jest.mock('../../src/helpers/logAction');

describe('Item Controller', () => {
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

  describe('createItemHandler', () => {
    it('should create a new item successfully', async () => {
      const itemData = {
        name: 'Test Item',
        description: 'Test Description',
        price: '100'
      };
      mockRequest.body = itemData;

      (Item.create as jest.Mock).mockResolvedValue({
        ...itemData,
        price: 100,
        id: 1
      });

      await itemController.createItemHandler(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(Item.create).toHaveBeenCalledWith({
        ...itemData,
        price: 100
      });
    });
  });

  describe('searchItemsHandler', () => {
    it('should search items successfully', async () => {
      mockRequest.query = {
        name: 'test',
        page: '1',
        limit: '10'
      };

      const mockItems = {
        count: 1,
        rows: [
          {
            id: 1,
            name: 'Test Item',
            description: 'Test Description',
            price: 100
          }
        ]
      };

      (Item.findAndCountAll as jest.Mock).mockResolvedValue(mockItems);

      await itemController.searchItemsHandler(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(Item.findAndCountAll).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});
