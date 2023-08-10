import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: '<p>{{current | date: "mm:ss"}}</p>',
})
export class TimerComponent implements OnInit, OnDestroy {
  private subscription$: Subscription | undefined;
  private startTime = 0;
  current = new Date(0);

  ngOnInit(): void {
    this.startTime = Date.now() - this.startTime;
    this.subscription$ = interval(1000).subscribe(() => {
      const elapsed = Date.now() - this.startTime;
      this.current = new Date(elapsed);
    });
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}
