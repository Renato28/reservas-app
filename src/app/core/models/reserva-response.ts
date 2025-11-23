export interface ReservaResponse {
    id: number;
    nomeCliente: string;
    numeroQuarto: string;
    dataCheckIn: string;
    dataCheckOut: string;
    valorTotal: number;
    status: string;
    dataCriacao: string
    dataAtualizacao: string;
}