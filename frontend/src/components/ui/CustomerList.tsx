import { useEffect, useState } from "react";
import CustomerResponse from "../../interfaces/CustomerResponse";
import CustomerCard from "./CustomerCard";
import SelectFilter from "./SelectFilter";

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerResponse[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<
    CustomerResponse[]
  >([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/list-customers");
      const data = await response.json();
      setCustomers(data);
      setFilteredCustomers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = (filteredData: CustomerResponse[]) => {
    setFilteredCustomers(filteredData);
  };

  return (
    <>
      <SelectFilter applyFilters={applyFilters} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {filteredCustomers.map(customer => (
          <CustomerCard
            key={customer.id}
            id={customer.id}
            created_at={customer.created_at}
            nome={customer.nome}
            email={customer.email}
            telefone={customer.telefone}
            coordenada_x={customer.coordenada_x}
            coordenada_y={customer.coordenada_y}
          />
        ))}
      </div>
    </>
  );
};

export default CustomerList;
