# Teste de Programação Desenvolvedor Facilita Jurídico

Repositório para armazenar a solução do teste de programação para desenvolvedor Facilita Jurídico.

## Sumário 

- [Instalação](#instalação)
- [Backend](#backend)
- [Frontend](#frontend)
- [Instruções do Desafio](#instruções-do-desafio)

## Instalação

A solução foi desenvolvida conforme as instruções com **Node.js**, **PostgreSQL** e **React**.
Assim sendo, as dependências para o projeto são:

- [Node.js](https://nodejs.org/en)
- [Docker](https://docs.docker.com/compose/install/standalone/)

1. Clone o repositório:

```sh
git clone https://github.com/pedro-git-projects/teste-desenvolvedor-facilita-juridico.git 

```

2.  Navegue até o diretório clonado e execute o seguinte comando:

```sh
npm run install  && npm run setup-env
```
Isso instalará as dependências do back e frontend e criará um arquivo .env com as variáveis de ambiente necessárias para configuração da conexão com o banco de dados.

3. Navegue para /backend e suba o banco de dados

```sh
docker-compose up
```

4. Ainda em /backend, suba a aplicação

```
npm run dev
```

5. Navegue para /frontend e suba a aplicação

```
npm run dev
```

6. Agora basta acessar a aplicação em http://localhost:5173

## Backend:

A aplicação foi desenvolvida utilizando **TypeScript** no back e frontend. 

O backend foi desenvolvido utilizando o módulo **http** do **Node.js**. Não foram utilizados frameworks ou micro-frameworks.

O banco de dados foi conteinerizado utilizando **docker** e a definição da tabela do banco de dados se deu no arquivo  *create_tables.sql*:

```sql
CREATE TABLE IF NOT EXISTS clientes(
	id bigserial PRIMARY KEY,
	created_at timestamp(0) with time zone NOT NULL DEFAULT NOW(),
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  coordenada_x DOUBLE PRECISION NOT NULL,
  coordenada_y DOUBLE PRECISION NOT NULL
);
```

Dado o *docker-compose.yml* as tabelas do banco de dados são criadas quando o comando *docker-compose up* é invocado através do script *init-db.sh* 

```sh
#!/bin/bash
set -e

# executa o script para criar a tabela de clientes 
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/create_tables.sql
```

A estrutura da aplicação é simples, porém robusta, o ponto de entrada é o arquivo index.ts:

```
async function main() {
  try {
    const config = createConfig(3000, "development");
    const application = await createApplication(config);
    application.listenAndServe();
  } catch (error) {
    console.error("Error starting application:", error);
    process.exit(1);
  }
}
```

Temos ainda os módulos:

- app: responsável por encapsular características do servidos como configuração, tipo de ambiente, conexão com banco de dados, handlers e multiplexador.

- lib: contém código reutilizável que é menos específico do que a aplicação. Neste caso temos o submódulo data-strcutures onde implementei as classes GraphNode, PriorityQueue e WeightedDirectetGraph.

- models: contém interfaces que definem o formato dos objetos que pretendemos inserir no banco de dados. É necessário lembrar que a única biblioteca utlizada para lidar com o banco de dados foi pg, não tendo sido utilizados ORMs.

O desafio principal da aplicação backend foi fazer o cálculo do caminho mais curto entre a loja e os clientes. Para isso foi implementada uma variação do algoritmo de Dijkstra onde os pesos dos grafos são estimados utilizando a distância euclidiana entre as coordenadas de cada cliente.


## Frontend

O frontend foi construído com **React** e **TypeScript** e as estilizações foram feitas com **TailwindCSS**. 

As rotas foram criadas utilizando a biblioteca **ReactRouterDom**. Foi criado ainda um provider de modo escuro para maior conforto visual do avaliador. 

A estrutura do frontend é a seguinte:

- src/assets: responsável por armazenar os assets da aplicação, neste caso a logo do React utilizada no header

- src/components/layout: Contém componentes que são utilizados em todas as páginas assim como o componente Layout que aceita filhos, os quais são renderizados dentro de si. 

- src/components/state: Contém a definição do provider para modo escuro.

- src/components/ui: Contém componentes da interface do usuário do site, como alertas, cards e tabelas.

- src/interfaces: Contém a definição de interfaces que representam o tipo de resposta que estamos esperando da API do backend.

- src/pages: Contém o componente que será utilizado em cada rota.

O frotend é simples mas responsivo.

## Instruções do Desafio 

### Sistema de Gerenciamento de Clientes
#### Parte 1

Uma empresa que realiza limpeza em residências enfrenta desafios no gerenciamento de seus clientes e busca uma solução eficiente para cadastrar e visualizar as informações que hoje são controladas em planilhas. Para centralizar as informações e ajudar na expansão da empresa, ela deseja uma plataforma onde seja possível gerenciar os seus clientes. O sistema deve ser composto por um backend em **Node.js** utilizando **PostgreSQL** como banco de dados, e um frontend em **React**.

A empresa utiliza as seguintes informações para gerenciar seus clientes: **nome**, **email** e **telefone**.

Na plataforma criada deve ser possível:
    - Listar os seus clientes e filtrar com base nas informações cadastradas
    - Cadastrar clientes novos

#### Parte 2

Suponha que, além de cadastrar e visualizar clientes, a empresa deseja otimizar as rotas de atendimento para maximizar a eficiência na visitação dos clientes. Considere um mapa bidimensional representando a localização dos clientes, onde cada ponto cartesiano possui um cliente. Cada cliente cadastrado possui uma coordenada X e uma coordenada Y nesse mapa.

**O objetivo é calcular a rota** partindo da empresa (0,0) e que passe pela localização de todos os clientes cadastrados no banco de dados e retorne à empresa no final. A rota deve ser calculada para ter a **menor distância possível**.


O algoritmo para calcular essa rota deve estar disponibilizado via rota da api para ser chamado pelo front quando necessário.

Implemente um botão na tela de clientes que, ao ser clicado, abre uma modal e mostra a ordem de visitação dos clientes na rota calculada. A visualização pode ser a mais simples possível mostrando uma lista dos clientes na ordem que devem ser visitados do primeiro ao último cliente da rota.

Ao desenvolver essa segunda parte, altere a rota de cadastro e visualização para que seja possível cadastrar e visualizar as coordenadas X e Y dos clientes da empresa.
