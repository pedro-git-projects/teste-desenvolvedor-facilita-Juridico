var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addCustomer } from "./handlers.js";
const Router = (req, res, dbConnection) => __awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    switch (url.pathname) {
        case "/add-customer":
            if (req.method === 'POST') {
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                    try {
                        let parsedBody;
                        const contentType = req.headers['content-type'];
                        if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('json')) {
                            parsedBody = JSON.parse(body);
                        }
                        else if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('urlencoded')) {
                            parsedBody = {};
                            for (const [key, value] of new URLSearchParams(body)) {
                                parsedBody[key] = value;
                            }
                        }
                        else {
                            throw new Error('Unsupported content type');
                        }
                        const cliente = {
                            nome: parsedBody.nome || "",
                            email: parsedBody.email || "",
                            telefone: parsedBody.telefone || "",
                            coordenada_x: parsedBody.coordenada_x || 0,
                            coordenada_y: parsedBody.coordenada_y || 0
                        };
                        yield addCustomer(dbConnection, cliente);
                        res.writeHead(200, { "Content-Type": "text/plain" });
                        res.end("Customer added successfully\n");
                    }
                    catch (error) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end(`Error adding customer: ${error}\n`);
                    }
                }));
            }
            else {
                res.writeHead(405, { "Content-Type": "text/plain" });
                res.end("Method Not Allowed\n");
            }
            break;
        default:
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found\n");
    }
});
export default Router;
//# sourceMappingURL=rotues.js.map