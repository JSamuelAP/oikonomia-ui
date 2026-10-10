import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { version } from 'packageJson';

@Component({
  imports: [RouterOutlet],
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.html',
})
export class AuthLayout {
  protected readonly version = version;
}
