import { useState } from "react";
import Customer from "../../interfaces/Customer";
import AlertSuccess from "./AlertSuccess";
import AlertFailiure from "./AlertFailiure";

const CostumerRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<Customer>({
    nome: "",
    email: "",
    telefone: "",
    coordenada_x: "",
    coordenada_y: "",
  });

  const [errors, setErrors] = useState<Partial<Customer>>({});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailiureAlert, setshowFailiureAlert] = useState(false);

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleCloseFailiureAlert = () => {
    setshowFailiureAlert(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidNumber = (value: string) => {
    return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: Partial<Customer> = {};
    let isValid = true;
    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }
    if (!formData.telefone.trim()) {
      newErrors.telefone = "Telefone é obrigatório";
      isValid = false;
    }
    if (!formData.coordenada_x.trim()) {
      newErrors.coordenada_x = "Coordenada x é obrigatória";
      isValid = false;
    }
    if (!formData.coordenada_y.trim()) {
      newErrors.coordenada_y = "Coordenada x é obrigatória";
      isValid = false;
    }
    if (!isValidNumber(formData.coordenada_x)) {
      newErrors.coordenada_x = "Coordenada X deve ser um número válido";
      isValid = false;
    }
    if (!isValidNumber(formData.coordenada_y)) {
      newErrors.coordenada_y = "Coordenada Y deve ser um número válido";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/add-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setShowSuccessAlert(true);
          setFormData({
            nome: "",
            email: "",
            telefone: "",
            coordenada_x: "",
            coordenada_y: "",
          });
        } else {
          setshowFailiureAlert(true);
          setFormData({
            nome: "",
            email: "",
            telefone: "",
            coordenada_x: "",
            coordenada_y: "",
          });
        }
      } catch (error) {
        setshowFailiureAlert(true);
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          coordenada_x: "",
          coordenada_y: "",
        });
        console.error("Failed to add customer:", error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Formulário para Registro de Clientes
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="nome" className="sr-only">
            Nome
          </label>
          <div className="relative">
            <input
              type="text"
              name="nome"
              className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-800 ${
                errors.nome ? "border-red-500" : ""
              }`}
              placeholder="Insira o nome"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-800 ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="telefone" className="sr-only">
            Telefone
          </label>
          <div className="relative">
            <input
              type="text"
              name="telefone"
              className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-800 ${
                errors.telefone ? "border-red-500" : ""
              }`}
              placeholder="Insira o telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            {errors.telefone && (
              <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="coordenada_x" className="sr-only">
            Coordenada X
          </label>
          <div className="relative">
            <input
              type="number"
              name="coordenada_x"
              className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-800 ${
                errors.coordenada_x ? "border-red-500" : ""
              }`}
              placeholder="Insira o número da coordenada x"
              value={formData.coordenada_x}
              onChange={handleChange}
            />
            {errors.coordenada_x && (
              <p className="text-red-500 text-sm mt-1">{errors.coordenada_x}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="coordenada_y" className="sr-only">
            Coordenada Y
          </label>
          <div className="relative">
            <input
              type="number"
              name="coordenada_y"
              className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm dark:bg-gray-800 dark:text-white dark:border-gray-800 ${
                errors.coordenada_y ? "border-red-500" : ""
              }`}
              placeholder="Insira o número da coordenada y"
              value={formData.coordenada_y}
              onChange={handleChange}
            />
            {errors.coordenada_y && (
              <p className="text-red-500 text-sm mt-1">{errors.coordenada_y}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Cadastrar
          </button>
        </div>
      </form>
      {showSuccessAlert && (
        <AlertSuccess
          mainText="Cliente cadastrado com sucesso!"
          secondaryText="O cliente foi adicionado à sua base de dados."
          onClose={handleCloseSuccessAlert}
        />
      )}
      {showFailiureAlert && (
        <AlertFailiure
          mainText="Algo Aconteceu..."
          secondaryText="Falha ao cadastrar cliente"
          onClose={handleCloseFailiureAlert}
        />
      )}
    </div>
  );
};

export default CostumerRegisterForm;
