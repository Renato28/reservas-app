export interface HotelResponse {
    id: number;
    nome: string;
    telefone: string;
    endereco: {
        cep: string;
        logradouro: string;
        numero: string;
        complemento?: string;
        bairro: string;
        cidade: string;
        estado: string;
    };
}