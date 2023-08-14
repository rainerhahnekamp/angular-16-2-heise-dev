import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DaylightService {
  getSunTimes() {
    let sunrise = new Date();
    sunrise.setHours(5, 45);
    const sunset = new Date();
    sunset.setHours(20, 12);

    if (new Date() > sunset) {
      sunrise = new Date(sunrise.getTime() + 1000 * 3600 * 24);
    }

    return { sunrise, sunset };
  }

  isDay() {
    const now = new Date();
    const { sunset, sunrise } = this.getSunTimes();

    return now > sunrise && now < sunset;
  }
}
