import { Component } from '@angular/core';

@Component({
  selector: 'app-circle',
  template: `
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 100 30
           C 130 20, 170 40, 160 80
           C 180 100, 140 150, 100 160
           C 60 170, 30 140, 40 100
           C 20 70, 50 40, 90 40
           C 110 20, 130 30, 140 50
           C 160 60, 150 90, 130 110
           C 110 130, 70 140, 50 120
           C 30 100, 40 60, 80 50
           C 100 40, 110 50, 120 70
           C 140 90, 120 120, 90 130
           C 60 140, 40 110, 50 80
           C 60 50, 90 30, 100 30 Z"
        fill="none"
        stroke="black"
        stroke-width="2"
        stroke-dasharray="800"
      />
    </svg>
  `,
  styles: `
   path {
      animation: draw .5s ease forwards;
    }

    @keyframes draw {
      from {
        stroke-dashoffset: 800;
      }
      to {
        stroke-dashoffset: 0;
      }
    }

`,
})
export class CircleComponent {}
