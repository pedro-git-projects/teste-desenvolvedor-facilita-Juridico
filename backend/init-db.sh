#!/bin/bash
set -e

# executa o script para criar a tabela de clientes 
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/create_tables.sql
