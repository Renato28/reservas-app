export type Status = 'DISPONIVEL' | 'OCUPADO' | 'MANUTENCAO'

export interface QuartoRequest {
    id?: number;
    numero: string;
    tipo: string;
    precoDiaria: number;
    status: Status;
}
