import CustomerResponse from "../../interfaces/CustomerResponse";

const CustomerCard: React.FC<CustomerResponse> = ({
  nome,
  email,
  telefone,
  coordenada_x,
  coordenada_y,
}) => {
  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm dark:border-gray-700">
      <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
          <dt className="font-medium text-gray-900 dark:text-white">Nome</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {nome}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
          <dt className="font-medium text-gray-900 dark:text-white">Email</dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {email}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
          <dt className="font-medium text-gray-900 dark:text-white">
            Telefone
          </dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
            {telefone}
          </dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4 even:dark:bg-gray-800">
          <dt className="font-medium text-gray-900 dark:text-white">
            Coordenadas
          </dt>
          <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">{`(${coordenada_x}, ${coordenada_y})`}</dd>
        </div>
      </dl>
    </div>
  );
};

export default CustomerCard;
