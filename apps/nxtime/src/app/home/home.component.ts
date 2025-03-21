import { Component, inject, OnInit, signal } from '@angular/core';
import { CircleComponent } from './circle.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  host: {
    class: 'overflow-scroll-helper',
  },
  imports: [CircleComponent],
})
export class HomeComponent implements OnInit {
  public days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  selectedDay = signal('MON');
  httpClient = inject(HttpClient);

  public handleClick(day: string) {
    this.selectedDay.set(day);
  }

  ngOnInit(): void {
    console.log('here');
    this.httpClient.get('/api/people').subscribe(console.log);
  }
}
