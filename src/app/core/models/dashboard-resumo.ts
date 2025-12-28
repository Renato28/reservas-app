export interface DashboardResumo {
  reservasAtivas: number;
  reservasPendentes: number;
  checkIns: number;
  checkOuts: number;
  hospedesAtuais: number;
  quartosOcupados: number;
  quartosDisponiveis: number;
  taxaOcupacao: number;
  receitaDoMes: number;
  graficoLabels: string[];
  graficoCheckIns: number[];
  graficoCheckOuts: number[];
}
