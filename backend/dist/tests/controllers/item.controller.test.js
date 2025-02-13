"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_model_1 = require("../../src/models/item.model");
const itemController = __importStar(require("../../src/controllers/item.controller"));
jest.mock('../../src/models/item.model');
jest.mock('../../src/helpers/logAction');
describe('Item Controller', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
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
        it('should create a new item successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const itemData = {
                name: 'Test Item',
                description: 'Test Description',
                price: '100'
            };
            mockRequest.body = itemData;
            item_model_1.Item.create.mockResolvedValue(Object.assign(Object.assign({}, itemData), { price: 100, id: 1 }));
            yield itemController.createItemHandler(mockRequest, mockResponse, nextFunction);
            expect(item_model_1.Item.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, itemData), { price: 100 }));
        }));
    });
    describe('searchItemsHandler', () => {
        it('should search items successfully', () => __awaiter(void 0, void 0, void 0, function* () {
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
            item_model_1.Item.findAndCountAll.mockResolvedValue(mockItems);
            yield itemController.searchItemsHandler(mockRequest, mockResponse, nextFunction);
            expect(item_model_1.Item.findAndCountAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }));
    });
});
