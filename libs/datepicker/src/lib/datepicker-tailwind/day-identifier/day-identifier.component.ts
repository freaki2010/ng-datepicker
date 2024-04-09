import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment/min/moment-with-locales';

@Component({
  selector: 'lib-yatafu-day-identifier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-identifier.component.html',
  styleUrl: './day-identifier.component.scss',
})
export class DayIdentifierComponent {
  @Input() userLocale: string = "";
  @Input() day: number = 0;

  getDayName(): string {
    return moment(this.day, 'e')
    .locale(this.userLocale)
    .format('ddd')
  }
}
