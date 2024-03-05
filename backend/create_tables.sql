CREATE TABLE IF NOT EXISTS clientes(
	id bigserial PRIMARY KEY,
	created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  coordenada_x DOUBLE PRECISION NOT NULL,
  coordenada_y DOUBLE PRECISION NOT NULL
);
