import { Component, signal } from '@angular/core';
import { CircleComponent } from './circle.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  host: {
    class: 'overflow-scroll-helper',
  },
  imports: [CircleComponent],
})
export class HomeComponent {
  public days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  selectedDay = signal('MON');

  public handleClick(day: string) {
    this.selectedDay.set(day);
  }
}
