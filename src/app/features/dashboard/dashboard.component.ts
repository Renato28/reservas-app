import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../core/services/dashboard/dashboard.service';
import { DashboardResumo } from '../../core/models/dashboard-resumo';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexLegend, ApexResponsive } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resumo?: DashboardResumo;

  chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    colors: string[];
    plotOptions: ApexPlotOptions;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    responsive: ApexResponsive[];
  } = {
    series: [],
    chart: { type: 'bar', height: 350 },
    xaxis: { categories: [] },
    colors: [],
    plotOptions: { bar: { horizontal: false, columnWidth: '55%' }},
    dataLabels: { enabled: false},
    legend: { position: 'top' },
    responsive: [{ breakpoint: 768, options: { chart: { height: 300 }, legend: { position: 'bottom' } } }]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getResumo().subscribe(data => {
      this.resumo = data;

      // Atualiza os dados do gráfico
      this.chartOptions.series = [
        { name: 'Check-ins', data: data.graficoCheckIns },
        { name: 'Check-outs', data: data.graficoCheckOuts }
      ];

      this.chartOptions.xaxis = { categories: data.graficoLabels };
      this.chartOptions.colors = ['#10b981', '#ef4444'];
    });
  }
}
