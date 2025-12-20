import { EnderecoRequest } from "./endereco-request.model";

export interface HotelRequest {
    nome: string;
    telefone: string;
    endereco: EnderecoRequest
}
