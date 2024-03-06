import { useState } from "react";
import Layout from "../components/layout/Layout";
import CustomerResponse from "../interfaces/CustomerResponse";
import ShortestPathTable from "../components/ui/Pathtable";

const Rota: React.FC = () => {
  const [customers, setCustomers] = useState<Array<CustomerResponse>>([
    {
      id: 0,
      created_at: new Date(),
      nome: "Loja",
      email: "",
      telefone: "",
      coordenada_x: 0,
      coordenada_y: 0,
    },
  ]);
  const fetchShortestPath = () => {
    fetch("http://localhost:3000/shortest-path")
      .then(response => response.json())
      .then(data => {
        setCustomers(data);
      })
      .catch(error => {
        console.error("Error fetching shortest path:", error);
      });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg text-center mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Calcular Rota mais Eficiente
        </h1>
      </div>
      <div className="text-center">
        <a
          className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mb-4"
          onClick={fetchShortestPath}
        >
          <span className="text-sm font-medium"> Calcular </span>
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
        <ShortestPathTable customers={customers} />
      </div>
    </Layout>
  );
};

export default Rota;
