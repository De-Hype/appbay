import express from "express";
import request from "supertest";
import itemRoutes from "../../src/routes/item.routes";

describe("Item Routes", () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/v1/api", itemRoutes);
  });

  describe("POST /v1/api/items", () => {
    it("should have the correct full path", async () => {
      const response = await request(app).post("/v1/api/items").send({});

      expect(response.status).not.toBe(404);
    });
  });

  describe("GET /v1/api/items", () => {
    it("should have the correct full path", async () => {
      const response = await request(app).get("/v1/api/items");

      expect(response.status).not.toBe(404);
    });
  });

  describe("GET /v1/api/items/:id", () => {
    it("should have the correct full path", async () => {
      const response = await request(app).get("/v1/api/items/1");

      expect(response.status).not.toBe(404);
    });
  });

  describe("PUT /v1/api/items/:id", () => {
    it("should have the correct full path", async () => {
      const response = await request(app).put("/v1/api/items/1").send({});

      expect(response.status).not.toBe(404);
    });
  });

  describe("DELETE /v1/api/items/:id", () => {
    it("should have the correct full path", async () => {
      const response = await request(app).delete("/v1/api/items/1");

      expect(response.status).not.toBe(404);
    });
  });
});
