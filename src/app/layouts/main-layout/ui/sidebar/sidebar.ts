import { Component, input, output } from '@angular/core';
import { PIcon } from '@primeicons/angular/p-icon';

@Component({
  imports: [PIcon],
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  readonly open = input(false);
  readonly closed = output<void>();

  protected readonly items = [
    { icon: 'receipt', label: 'Transacciones' },
    { icon: 'wallet', label: 'Presupuestos' },
    { icon: 'tags', label: 'Categorías' },
  ];
}
