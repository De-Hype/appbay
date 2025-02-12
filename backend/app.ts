import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./src/routes/user.routes";
import itemRoutes from "./src/routes/item.routes";
import logger, { logRequest } from "./src/middleware/logger";
import AppError from "./src/errors/AppError";
import GlobalErrorHandler from "./src/errors/errorHandler";
import { PORT } from "./serviceUrl";
import { sequelize } from "./src/config/db.config";

dotenv.config();

const port = PORT || 8080;
const app = express();

// Middleware
process.on("uncaughtException", (err: Error) => {
  logger.error("Unhandled Exception, shutting down...");
  logger.error(`${err.name}: ${err.message}`);
  process.exit(1);
});

app.use(express.json());
app.set("trust proxy", 1);
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["5", "POST", "PATCH", "PUT", "DELETE"],
  })
);
sequelize.sync({ alter: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

app.use(helmet());
app.use(logRequest);



// Routes
app.use("/v1/api", userRoutes);
app.use("/v1/api", itemRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("User Management System API");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const errorMessage = `Cannot find ${req.originalUrl} with ${req.method} on this server`;
  logger.warn(errorMessage);
  next(new AppError(errorMessage, 404));
});

app.use(GlobalErrorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
