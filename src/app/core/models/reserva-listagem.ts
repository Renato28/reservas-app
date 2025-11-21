export interface ReservaListagem {
    numeroReserva: number;
    nomeCliente: string;
    numeroQuarto: string;
    dataCheckIn: string;
    dataCheckout: string;
    statusReserva: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA' | 'CHECK-IN' | 'CHECK-OUT';
    valorTotal: number;
}