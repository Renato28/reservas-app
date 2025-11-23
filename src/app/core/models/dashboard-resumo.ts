export interface DashboardResumo {
  reservasAtivas: number;
  reservasPendentes: number;
  checkInsHoje: number;
  checkOutsHoje: number;
  hospedesAtuais: number;
  quartosOcupados: number;
  quartosDisponiveis: number;
  taxaOcupacao: number;
  receitaDoMes: number;
  graficoLabels: string[];
  graficoCheckIns: number[];
  graficoCheckOuts: number[];
}
