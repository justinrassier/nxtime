import { Directive, ElementRef, inject, OnInit, output } from '@angular/core';
import {
  fromEvent,
  switchMap,
  map,
  filter,
  pairwise,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appSwipe]',
})
export class SwipeDirective implements OnInit {
  private host: ElementRef<HTMLDivElement> = inject(ElementRef<HTMLDivElement>);

  public swipe = output<'right' | 'left'>();

  ngOnInit(): void {
    const element = this.host.nativeElement;
    const pointerDown$ = fromEvent(element, 'pointerdown');
    const pointerMove$ = fromEvent(element, 'pointermove');
    const pointerUp$ = fromEvent(element, 'pointerup');

    pointerDown$
      .pipe(
        switchMap((startEvent: any) =>
          pointerMove$.pipe(
            map((moveEvent) => {
              return {
                deltaX:
                  (moveEvent as PointerEvent).clientX - startEvent.clientX,
                deltaY:
                  (moveEvent as PointerEvent).clientY - startEvent.clientY,
              };
            }),
            filter(({ deltaX, deltaY }) => Math.abs(deltaX) > Math.abs(deltaY)), // Ensure horizontal swipe
            pairwise(), // Compare previous and current move event
            filter(([prev, curr]) => Math.abs(curr.deltaX) > 50), // Min swipe threshold
            map(([_, curr]) =>
              curr.deltaX > 0 ? ('right' as const) : ('left' as const)
            ), // Determine direction
            takeUntil(pointerUp$) // Stop tracking when pointer is lifted
          )
        )
      )
      .subscribe((result) => {
        this.swipe.emit(result);
      });
  }
}
