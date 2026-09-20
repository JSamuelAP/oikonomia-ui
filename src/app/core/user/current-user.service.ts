import { Service, signal } from '@angular/core';

import { UserProfile } from './models/user-profile';

@Service()
export class CurrentUserService {
  private readonly userSignal = signal<UserProfile | null>(null);

  readonly user = this.userSignal.asReadonly();

  set(user: UserProfile) {
    this.userSignal.set(user);
  }

  clear() {
    this.userSignal.set(null);
  }
}
