import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

import { Header } from './ui/header/header';
import { Sidebar } from './ui/sidebar/sidebar';

@Component({
  imports: [AvatarModule, Header, RouterOutlet, Sidebar],
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
})
export class MainLayout {
  protected readonly sidebarOpen = signal(false);

  protected toggleSidebar() {
    this.sidebarOpen.update((open) => !open);
  }

  protected closeSidebar() {
    this.sidebarOpen.set(false);
  }
}
