import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnChanges {

  @Input() titulo: string = '';
  @Input() valor: number | string | null | undefined = null;
  @Input() iconeClass?: string; // opcional (ex: 'fa-solid fa-calendar-days')

  animated = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('valor' in changes && !changes['valor'].firstChange) {
      this.animated = true;
      setTimeout(() => (this.animated = false), 450);
    }
  }

  get displayValue(): string {
    if (this.valor === null || this.valor === undefined) return '-';
    return String(this.valor);
  }
}
