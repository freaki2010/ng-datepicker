import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';



export class Day {
  constructor(
    public date: Date,
    public isInCalendarMonth: boolean,
    public isSelected: boolean,
    public isDisabled: boolean,
    public isToday: boolean,
  ) {}
}

@Component({
  selector: 'lib-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
})
export class DayComponent {
  @Input() userLocale = 'en';
  @Input() day: Day = new Day( new Date(), false, false, false, false);

  @Output() newDayEvent = new EventEmitter<Date>();
  
  getClassForDay(): string 
  {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.day.isSelected) {
      return 'bg-dpprimary-500 text-white hover:cursor-pointer';
    } else if (this.day.isToday) {
      return 'bg-dpsecondary-500 text-white hover:cursor-pointer';
    } else if (false === this.day.isInCalendarMonth && this.day.isDisabled) {
      return 'text-dpprimary-600 opacity-60 hover:cursor-default';
    } else if (false === this.day.isInCalendarMonth) {
      return 'text-dpprimary-600 opacity-60 hover:cursor-pointer hover:bg-dpsecondary-200';
    } else if (this.day.isDisabled) {
      return 'text-dpsecondary-700 opacity-60 hover:cursor-default';
    }

    return 'text-dpsecondary-700 hover:bg-dpprimary-200 hover:cursor-pointer';
  }
}
