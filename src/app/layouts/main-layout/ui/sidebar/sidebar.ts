import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  imports: [PIcon, RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly open = input(false);
  readonly closed = output<void>();

  protected readonly items = [
    { icon: 'receipt', label: 'Transacciones', path: 'transactions' },
    { icon: 'wallet', label: 'Presupuestos', path: 'budgets' },
    { icon: 'tags', label: 'Categorías', path: 'categories' },
  ];
}
