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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const item_routes_1 = __importDefault(require("./src/routes/item.routes"));
const logger_1 = __importStar(require("./src/middleware/logger"));
const AppError_1 = __importDefault(require("./src/errors/AppError"));
const errorHandler_1 = __importDefault(require("./src/errors/errorHandler"));
const serviceUrl_1 = require("./serviceUrl");
const db_config_1 = require("./src/config/db.config");
dotenv_1.default.config();
const port = serviceUrl_1.PORT || 8080;
const app = (0, express_1.default)();
// Middleware
process.on("uncaughtException", (err) => {
    logger_1.default.error("Unhandled Exception, shutting down...");
    logger_1.default.error(`${err.name}: ${err.message}`);
    process.exit(1);
});
app.use(express_1.default.json());
app.set("trust proxy", 1);
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:5174", "http://localhost:5173"],
    methods: ["5", "POST", "PATCH", "PUT", "DELETE"],
}));
db_config_1.sequelize.sync({ alter: true })
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.error("Database connection failed:", err));
app.use((0, helmet_1.default)());
app.use(logger_1.logRequest);
// Routes
app.use("/v1/api", user_routes_1.default);
app.use("/v1/api", item_routes_1.default);
app.get("/", (req, res) => {
    res.send("User Management System API");
});
app.all("*", (req, res, next) => {
    const errorMessage = `Cannot find ${req.originalUrl} with ${req.method} on this server`;
    logger_1.default.warn(errorMessage);
    next(new AppError_1.default(errorMessage, 404));
});
app.use(errorHandler_1.default);
app.listen(port, () => {
    logger_1.default.info(`Server running on port ${port}`);
});
