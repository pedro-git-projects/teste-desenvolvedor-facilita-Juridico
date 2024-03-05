import Layout from "../components/layout/Layout";
import CustomerList from "../components/ui/CustomerList";

const Consultar: React.FC = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-lg text-center mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl">Lista de Clientes</h1>
      </div>
      <CustomerList />
    </Layout>
  );
};

export default Consultar;
