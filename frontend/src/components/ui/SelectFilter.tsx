import { useState } from "react";
import CustomerResponse from "../../interfaces/CustomerResponse";

interface SelectedFilterProps {
  applyFilters: (filteredData: CustomerResponse[]) => void;
}

const SelectFilter: React.FC<SelectedFilterProps> = ({ applyFilters }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      applyFilters(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterSearch = () => {
    if (selectedFilter === "Email") {
      fetchData(`http://localhost:3000/list-customers?email=${searchValue}`);
    } else if (selectedFilter === "Nome") {
      fetchData(`http://localhost:3000/list-customers?nome=${searchValue}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-8 items-center text-center">
      <div>
        <label
          htmlFor="Filters"
          className="block text-sm font-medium text-gray-900"
        >
          Filtros
        </label>
        <select
          name="Filters"
          id="Filters"
          className="mt-1.5 max-w-md w-full rounded-lg border-gray-300 dark:border-gray-800 text-gray-700 sm:text-sm dark:bg-gray-800 dark:text-white"
          onChange={handleFilterChange}
          value={selectedFilter}
        >
          <option value="">Selecione um Filtro</option>
          <option value="Email">Email</option>
          <option value="Nome">Nome</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="UserInput"
          className="block text-xs font-medium text-gray-700 dark:text-gray-200"
        >
          {selectedFilter === "Email"
            ? "Filtrar por Email"
            : "Filtrar por Nome"}
        </label>
        <input
          type={selectedFilter === "Email" ? "email" : "text"}
          id="UserInput"
          placeholder={
            selectedFilter === "Email" ? "john@rhcp.com" : "John Doe"
          }
          className="mt-1 max-w-md w-full rounded-md border-gray-200 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          onChange={handleInputChange}
          value={searchValue}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="max-w-md inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 mb-4"
          onClick={handleFilterSearch}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default SelectFilter;
