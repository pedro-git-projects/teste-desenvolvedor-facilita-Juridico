import CustomerResponse from "../../interfaces/CustomerResponse";

const ShortestPathTable: React.FC<{ customers: Array<CustomerResponse> }> = ({
  customers,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
        <thead className="ltr:text-left">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Posição
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Nome
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
              Coordenadas
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className={
                index % 2 === 0 ? "odd:bg-gray-50 dark:odd:bg-gray-800/50" : ""
              }
            >
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                {index}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                {customer.nome}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                ({customer.coordenada_x}, {customer.coordenada_y})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShortestPathTable;
