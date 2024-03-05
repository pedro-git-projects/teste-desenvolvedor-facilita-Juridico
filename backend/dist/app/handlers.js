var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function addCustomer(dbConnection, cliente) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y)
    VALUES ($1, $2, $3, $4, $5)
  `;
        const values = [
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.coordenada_x,
            cliente.coordenada_y
        ];
        try {
            yield dbConnection.query(query, values);
            console.log('Customer added successfully');
        }
        catch (error) {
            console.error('Error adding customer:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=handlers.js.map