import { Pool } from "pg";
import Cliente from "../models/customer.js";
import FilterOptions from "../models/filterOptions.js";

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

export async function listCustomers(
  dbConnection: Pool,
  filterOptions?: FilterOptions,
): Promise<Cliente[]> {
  let query = `
    SELECT * FROM clientes
  `;
  const values: any[] = [];

  if (filterOptions) {
    const { nome, email } = filterOptions;
    const conditions = [];
    if (nome) {
      conditions.push(`nome = $${values.length + 1}`);
      values.push(nome);
    }
    if (email) {
      conditions.push(`email = $${values.length + 1}`);
      values.push(email);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
  }

  try {
    const result = await dbConnection.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error listing customers:", error);
    throw error;
  }
}
