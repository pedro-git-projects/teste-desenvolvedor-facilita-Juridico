import { HttpLogger, pinoHttp } from "pino-http";
import http from "http";
import pg from "pg";
import { Pool } from "pg";
import dotenv from "dotenv";
import Router from "./rotues.js";

export const version = "1.0.0";

type Env = "development" | "homologation" | "production";

export interface DB {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
}

export interface Config {
  port: number;
  env: Env;
  db: DB;
}

export interface Application {
  config: Config;
  dbConnection: Pool;
  logger: HttpLogger;
  listenAndServe: () => void;
}

export function createDB(): DB {
  dotenv.config();
  return {
    user: process.env.POSTGRES_USER || "",
    host: process.env.POSTGRES_HOST || "",
    database: process.env.POSTGRES_DB || "",
    password: process.env.POSTGRES_PASSWORD || "",
    port: parseInt(process.env.POSTGRES_PORT || "0", 10) || 5432,
  };
}

export function createConfig(port: number, env: Env): Config {
  const db = createDB();
  return {
    port,
    env,
    db,
  };
}

export async function openDBConnection(dbConfig: DB): Promise<Pool> {
  const pool = new pg.Pool({
    user: dbConfig.user,
    host: dbConfig.host,
    database: dbConfig.database,
    password: dbConfig.password,
    port: dbConfig.port,
  });
  try {
    await pool.connect();
    return pool;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

export async function createApplication(config: Config): Promise<Application> {
  try {
    const logger = pinoHttp();
    const dbConnection = await openDBConnection(config.db);

    const listenAndServe = () => {
      const server = http.createServer(Router);
      server.listen(config.port, () => {
        console.log("running ", config.env ," server on port :", config.port);
      });
    };

    return {
      config,
      dbConnection,
      logger,
      listenAndServe,
    };
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
}
