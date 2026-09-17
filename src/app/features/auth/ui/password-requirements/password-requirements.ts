import { Component, computed, input } from '@angular/core';
import { Check } from '@primeicons/angular/check';
import { Shield } from '@primeicons/angular/shield';
import { Times } from '@primeicons/angular/times';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';

import { PASSWORD_REQUERIMENTS } from '@auth/utils/password-policy';

@Component({
  imports: [Check, ProgressBarModule, Shield, TagModule, Times],
  selector: 'app-password-requirements',
  templateUrl: './password-requirements.html',
})
export class PasswordRequirements {
  readonly value = input('');

  protected readonly requirements = computed(() =>
    PASSWORD_REQUERIMENTS.map((r) => ({ id: r.id, label: r.label, met: r.test(this.value()), weight: r.weight })),
  );

  protected readonly score = computed<number>(() => {
    if (!this.value()) return 0;
    return this.requirements().reduce((acc, req) => acc + (req.met ? req.weight : 0), 0);
  });

  protected readonly severity = computed((): 'danger' | 'warn' | 'info' | 'success' => {
    const s = this.score();
    if (s <= 20) return 'danger';
    if (s <= 40) return 'warn';
    if (s <= 60) return 'info';
    return 'success';
  });

  protected readonly progressbarColor = computed(() => {
    switch (this.severity()) {
      case 'danger':
        return 'var(--p-red-500)';
      case 'warn':
        return 'var(--p-amber-500)';
      case 'info':
        return 'var(--p-blue-500)';
      case 'success':
        return 'var(--p-green-500)';
    }
  });

  protected readonly label = computed(() => {
    const s = this.score();
    if (s === 0) return '';
    if (s <= 20) return 'Muy débil';
    if (s <= 40) return 'Débil';
    if (s <= 60) return 'Aceptable';
    if (s <= 80) return 'Fuerte';
    return 'Muy fuerte';
  });
}
