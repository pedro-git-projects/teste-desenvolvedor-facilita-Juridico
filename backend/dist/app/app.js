var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pinoHttp } from "pino-http";
import http from "http";
import pg from "pg";
import dotenv from "dotenv";
import Router from "./rotues.js";
export const version = "1.0.0";
export function createDB() {
    dotenv.config();
    return {
        user: process.env.POSTGRES_USER || "",
        host: process.env.POSTGRES_HOST || "",
        database: process.env.POSTGRES_DB || "",
        password: process.env.POSTGRES_PASSWORD || "",
        port: parseInt(process.env.POSTGRES_PORT || "0", 10) || 5432,
    };
}
export function createConfig(port, env) {
    const db = createDB();
    return {
        port,
        env,
        db,
    };
}
export function openDBConnection(dbConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg.Pool({
            user: dbConfig.user,
            host: dbConfig.host,
            database: dbConfig.database,
            password: dbConfig.password,
            port: dbConfig.port,
        });
        try {
            yield pool.connect();
            return pool;
        }
        catch (error) {
            console.error("Error connecting to database:", error);
            throw error;
        }
    });
}
export function createApplication(config) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const logger = pinoHttp();
            const dbConnection = yield openDBConnection(config.db);
            const listenAndServe = () => {
                const server = http.createServer((req, res) => Router(req, res, dbConnection));
                server.listen(config.port, () => {
                    console.log("running ", config.env, " server on port :", config.port);
                });
            };
            return {
                config,
                dbConnection,
                logger,
                listenAndServe,
            };
        }
        catch (error) {
            console.error("Error creating application:", error);
            throw error;
        }
    });
}
//# sourceMappingURL=app.js.map