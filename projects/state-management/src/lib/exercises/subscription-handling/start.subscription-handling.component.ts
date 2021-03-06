import {Component, OnDestroy} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {SourceService} from './source.service';

@Component({
  selector: 'subscription-handling',
  template: `
    <h2>Subscription Handling</h2>
    <div class="case-content">Process running internally</div>
  `
})
export class StartSubscriptionHandlingComponent implements OnDestroy {
  subscription = new Subscription();
  onDestroy$ = new Subject<void>();

  process1$ = this.source.$.pipe(
    tap(num => {
      console.log('New value: ', num);
    })
  );

  constructor(
    private source: SourceService,
  ) {
    this.process1$.pipe(takeUntil(this.onDestroy$)).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
