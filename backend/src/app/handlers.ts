import { Pool } from "pg";
import Cliente from "../models/customer.js";

export async function addCustomer(
  dbConnection: Pool,
  cliente: Cliente,
): Promise<void> {
  const query = `
    INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [
    cliente.nome,
    cliente.email,
    cliente.telefone,
    cliente.coordenada_x,
    cliente.coordenada_y,
  ];

  try {
    await dbConnection.query(query, values);
    console.log("Customer added successfully");
  } catch (error) {
    console.error("Error adding customer:", error);
    throw error;
  }
}
