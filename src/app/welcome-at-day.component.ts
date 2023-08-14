import { Component, Input } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  template: `<h2>Welcome {{ username }}</h2>
    <p>
      Our chat rooms are available. You can enter until
      {{ sunset | date: 'long' }}
    </p>
    <a routerLink="/chat-rooms">Chat Rooms</a>`,
  standalone: true,
  imports: [DatePipe, RouterLink],
})
export class WelcomeAtDayComponent implements WelcomeComponent {
  @Input() sunrise = new Date();
  @Input() sunset = new Date();
  @Input() username = '';
}
