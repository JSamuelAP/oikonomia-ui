import { Component, output } from '@angular/core';
import { Bars } from '@primeicons/angular/bars';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [Bars, ButtonModule],
  selector: 'app-header',
  templateUrl: './header.html',
})
export class Header {
  readonly menuToggle = output<void>();
}
