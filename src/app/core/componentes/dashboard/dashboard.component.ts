import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../services/dashboard/dashboard.service';
import { DashboardResumo } from '../../models/dashboard-resumo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resumo: DashboardResumo | undefined;

  // Configurações do ApexCharts
  public chartOptions: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getResumo().subscribe(data => {
      this.resumo = data;

      // Configuração do gráfico
      this.chartOptions = {
        series: [
          { name: 'Check-ins', data: data.graficoCheckIns ?? [] },
          { name: 'Check-outs', data: data.graficoCheckOuts ?? [] }
        ],
        chart: { type: 'bar', height: 320 },
        xaxis: { categories: data.graficoLabels ?? [] },
        colors: ['#10b981', '#ef4444'],
        plotOptions: { bar: { horizontal: false, columnWidth: '50%' } },
        dataLabels: { enabled: false },
        legend: { position: 'top' },
        responsive: [
          { breakpoint: 720, options: { chart: { height: 240 }, plotOptions: { bar: { columnWidth: '70%' } } } }
        ]
      };
    });
  }
}
