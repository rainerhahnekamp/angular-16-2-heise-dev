import { Component, Input } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  template: `<h2>Welcome {{ username }}</h2>
    <p>
      Our chat rooms are currently not available. You can enter at
      {{ sunrise | date: 'long' }}
    </p>`,
  standalone: true,
  imports: [DatePipe, RouterLink],
})
export class WelcomeAtNightComponent implements WelcomeComponent {
  @Input() sunrise = new Date();
  @Input() sunset = new Date();
  @Input() username = '';
}
