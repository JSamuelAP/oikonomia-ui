import { Component } from '@angular/core';

import { author, version } from 'packageJson';

@Component({
  imports: [],
  selector: 'app-footer',
  templateUrl: './footer.html',
})
export class Footer {
  protected readonly author = author;
  protected readonly version = version;
}
