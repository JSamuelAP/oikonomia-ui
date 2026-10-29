import { Component, computed, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

type StatSeverity = 'success' | 'danger' | 'neutral';

const SEVERITY_TEXT: Record<StatSeverity, string> = {
  success: 'text-green-900',
  danger: 'text-red-900',
  neutral: 'text-primary',
};

@Component({
  imports: [SkeletonModule],
  selector: 'app-stat-card',
  templateUrl: './stat-card.html',
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly severity = input<'success' | 'danger' | 'neutral'>('neutral');
  readonly loading = input(false);

  protected readonly textClass = computed(() => SEVERITY_TEXT[this.severity()]);
}
