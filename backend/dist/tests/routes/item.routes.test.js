"use strict";
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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const item_routes_1 = __importDefault(require("../../src/routes/item.routes"));
describe("Item Routes", () => {
    let app;
    beforeAll(() => {
        app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use("/v1/api", item_routes_1.default);
    });
    describe("POST /v1/api/items", () => {
        it("should have the correct full path", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post("/v1/api/items").send({});
            expect(response.status).not.toBe(404);
        }));
    });
    describe("GET /v1/api/items", () => {
        it("should have the correct full path", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get("/v1/api/items");
            expect(response.status).not.toBe(404);
        }));
    });
    describe("GET /v1/api/items/:id", () => {
        it("should have the correct full path", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).get("/v1/api/items/1");
            expect(response.status).not.toBe(404);
        }));
    });
    describe("PUT /v1/api/items/:id", () => {
        it("should have the correct full path", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).put("/v1/api/items/1").send({});
            expect(response.status).not.toBe(404);
        }));
    });
    describe("DELETE /v1/api/items/:id", () => {
        it("should have the correct full path", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete("/v1/api/items/1");
            expect(response.status).not.toBe(404);
        }));
    });
});
