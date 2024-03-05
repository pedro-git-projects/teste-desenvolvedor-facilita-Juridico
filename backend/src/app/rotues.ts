import http from "http";
import Cliente from "../models/customer.js";
import { addCustomer, listCustomers } from "./handlers.js";
import { Pool } from "pg";
import FilterOptions from "../models/filterOptions.js";

const Router = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  dbConnection: Pool,
) => {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  switch (url.pathname) {
    case "/add-customer":
      if (req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          try {
            let parsedBody: Cliente;
            const contentType = req.headers["content-type"];
            if (contentType?.includes("json")) {
              parsedBody = JSON.parse(body);
            } else if (contentType?.includes("urlencoded")) {
              parsedBody = {} as Cliente;
              for (const [key, value] of new URLSearchParams(body)) {
                parsedBody[key] = value;
              }
            } else {
              throw new Error("Unsupported content type");
            }

            const cliente: Cliente = {
              nome: parsedBody.nome || "",
              email: parsedBody.email || "",
              telefone: parsedBody.telefone || "",
              coordenada_x: parsedBody.coordenada_x || 0,
              coordenada_y: parsedBody.coordenada_y || 0,
            };

            await addCustomer(dbConnection, cliente);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Customer added successfully\n");
          } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(`Error adding customer: ${error}\n`);
          }
        });
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed\n");
      }
      break;
    case "/list-customers":
      if (req.method === "GET") {
        const filterOptions: FilterOptions = {
          nome: url.searchParams.get("nome") || undefined,
          email: url.searchParams.get("email") || undefined,
        };

        try {
          const customers = await listCustomers(dbConnection, filterOptions);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(customers));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end(`Error listing customers: ${error}\n`);
        }
      } else {
        res.writeHead(405, { "Content-Type": "text/plain" });
        res.end("Method Not Allowed\n");
      }
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found\n");
  }
};

export default Router;
