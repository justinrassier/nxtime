import { Component, computed, inject, signal } from '@angular/core';
import { CircleComponent } from './circle.component';
import { addDays, getWeekDataFromDate } from '@nxtime/util';
import { DatePipe } from '@angular/common';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { SwipeDirective } from './swipe.directive';

type State = {
  anchorDate: Date;
};

const initialState: State = {
  anchorDate: new Date(),
};

export const Store = signalStore(
  withState(initialState),
  withMethods((store) => ({
    swipe: (direction: 'left' | 'right') => {
      patchState(store, (state) => ({
        anchorDate: addDays(state.anchorDate, direction === 'left' ? 7 : -7),
      }));
    },
  })),
  withComputed(({ anchorDate }) => ({
    days: computed(() => getWeekDataFromDate(anchorDate())),
  }))
);

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  host: {
    class: 'overflow-scroll-helper',
  },
  imports: [CircleComponent, DatePipe, SwipeDirective],
  providers: [Store],
  styles: `
    .container {
      font-size: clamp(1rem, 5vh, 3rem);
      }
  `,
})
export class HomeComponent {
  public store = inject(Store);
  selectedDay = signal('MON');

  public handleSwipe(direction: 'right' | 'left') {
    this.store.swipe(direction);
  }
}
