"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_PASSWORD = exports.DB_HOST = exports.DB_USER = exports.DB_NAME = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * Validates the presence of a given environment variable.
 * @param envVar - The environment variable value to validate.
 * @param varName - The name of the environment variable for error reporting.
 * @returns The validated environment variable.
 * @throws Error if the environment variable is missing or undefined.
 */
function validateEnvVar(envVar, varName) {
    if (!envVar) {
        throw new Error(`${varName} is missing or undefined in the environment variables.`);
    }
    return envVar;
}
// DB_NAME=usermanagement
// DB_USER=postgres
// DB_PASSWORD=yourpassword
// DB_HOST=db  # Use 'db' when running inside Docker
// DB_PORT=5432
// Exporting validated environment variables
// export const DB_URI = validateEnvVar(process.env.DB_URI, "DB_URI");
exports.PORT = validateEnvVar(process.env.PORT, "PORT");
exports.NODE_ENV = validateEnvVar(process.env.NODE_ENV, "NODE_ENV");
exports.DB_NAME = validateEnvVar(process.env.DB_NAME, "DB_NAME");
exports.DB_USER = validateEnvVar(process.env.DB_USER, "DB_USER");
exports.DB_HOST = validateEnvVar(process.env.DB_HOST, "DB_HOST");
exports.DB_PASSWORD = validateEnvVar(process.env.DB_PASSWORD, "DB_PASSWORD");
