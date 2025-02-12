import dotenv from "dotenv";

dotenv.config();

/**
 * Validates the presence of a given environment variable.
 * @param envVar - The environment variable value to validate.
 * @param varName - The name of the environment variable for error reporting.
 * @returns The validated environment variable.
 * @throws Error if the environment variable is missing or undefined.
 */
function validateEnvVar(envVar: string | undefined, varName: string): string {
  if (!envVar) {
    throw new Error(
      `${varName} is missing or undefined in the environment variables.`
    );
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
export const PORT = validateEnvVar(process.env.PORT, "PORT");
export const NODE_ENV = validateEnvVar(process.env.NODE_ENV, "NODE_ENV");
export const DB_NAME = validateEnvVar(process.env.DB_NAME, "DB_NAME");
export const DB_USER = validateEnvVar(process.env.DB_USER, "DB_USER");
export const DB_HOST = validateEnvVar(process.env.DB_HOST, "DB_HOST");
export const DB_PASSWORD = validateEnvVar(process.env.DB_PASSWORD, "DB_PASSWORD");

