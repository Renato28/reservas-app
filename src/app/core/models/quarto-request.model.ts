import { StatusQuarto } from "./status-quarto.enum";
import { TipoQuarto } from "./tipo-quarto.enum";

export interface QuartoRequest {
    id?: number;
    numero: string;
    tipo: TipoQuarto;
    precoDiaria: number;
    status: StatusQuarto;
}
