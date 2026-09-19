import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

import { AuthFacade } from '@core/auth/auth.facade';

@Component({
  imports: [AvatarModule, MenuModule],
  selector: 'app-user-menu',
  templateUrl: './user-menu.html',
})
export class UserMenu {
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  protected readonly items: MenuItem[] = [
    { separator: true },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out text-red-500!',
      linkClass: 'text-red-500!',
      command: async () => {
        await this.handleLogout();
      },
    },
  ];

  private readonly handleLogout = async () => {
    await this.authFacade.logout();
    await this.router.navigateByUrl('/login');
  };
}
