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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../../src/models/user.model");
const log_model_1 = require("../../src/models/log.model");
const AppError_1 = __importDefault(require("../../src/errors/AppError"));
const userController = __importStar(require("../../src/controllers/user.controller"));
jest.mock('../../src/models/user.model');
jest.mock('../../src/models/log.model');
jest.mock('../../src/helpers/logAction');
describe('User Controller', () => {
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
    describe('createUserHandler', () => {
        it('should create a new user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                location: 'Test Location',
                role: 'user'
            };
            mockRequest.body = userData;
            user_model_1.User.findOne.mockResolvedValue(null);
            user_model_1.User.create.mockResolvedValue(userData);
            log_model_1.Log.create.mockResolvedValue(Object.assign(Object.assign({}, userData), { id: 1 }));
            yield userController.createUserHandler(mockRequest, mockResponse, nextFunction);
            expect(user_model_1.User.create).toHaveBeenCalledWith(userData);
        }));
        it('should return error if user already exists', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRequest.body = {
                email: 'existing@example.com'
            };
            user_model_1.User.findOne.mockResolvedValue({ id: 1 });
            yield userController.createUserHandler(mockRequest, mockResponse, nextFunction);
            expect(nextFunction).toHaveBeenCalledWith(expect.any(AppError_1.default));
        }));
    });
    describe('fetchUsersHandler', () => {
        it('should fetch users with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
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
            user_model_1.User.findAndCountAll.mockResolvedValue(mockUsers);
            yield userController.fetchUsersHandler(mockRequest, mockResponse, nextFunction);
            expect(user_model_1.User.findAndCountAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        }));
    });
});
