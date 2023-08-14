import {
  afterNextRender,
  afterRender,
  Component,
  ComponentRef,
  inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { DaylightService } from './daylight.service';
import { UserService } from './user.service';
import { WelcomeAtDayComponent } from './welcome-at-day.component';
import { WelcomeAtNightComponent } from './welcome-at-night.component';
import { WelcomeComponent } from './welcome.component';
import { NgComponentOutlet, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  styles: [
    `
      div.flex {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
      img {
        width: 50%;
      }
    `,
  ],
  template: `<ng-container
      *ngComponentOutlet="component; inputs: context"
    ></ng-container>
    <div class="flex">
      <img src="https://api.eternal-holidays.net/holiday/darmstadt.jpg" />
    </div>`,
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet, NgIf],
})
export class AppComponent {
  daylightService = inject(DaylightService);
  userService = inject(UserService);
  ngZone = inject(NgZone);
  component;
  context: Record<string, unknown> = {};
  cdCounter = 0;

  constructor() {
    afterRender(() => {
      console.log('CD Runs: ', ++this.cdCounter);
    });

    afterNextRender(() => {
      this.ngZone.runOutsideAngular(() => {
        const img = document.getElementsByTagName('img')[0] as HTMLImageElement;

        img.addEventListener('load', () => {
          if (img.naturalWidth > img.width) {
            console.error('image too large. consider NgOptimizedImage');
          }
        });
      });
    });

    this.component = this.daylightService.isDay()
      ? WelcomeAtDayComponent
      : WelcomeAtNightComponent;

    this.setContext();
    window.setInterval(() => this.setContext(), 1000);
  }

  setContext() {
    const { sunrise, sunset } = this.daylightService.getSunTimes();
    this.context = {
      username: this.userService.username,
      sunrise,
      sunset,
    };
  }
}
