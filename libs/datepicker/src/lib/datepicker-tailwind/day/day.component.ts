import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-day',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day.component.html',
  styleUrl: './day.component.css',
})

export class DayComponent {
  @Input() day: Date = new Date();
  @Input() calendarMonth: number = 0;
  @Input() userLocale: string = 'en';
  @Input() isSelected: boolean = false;
  @Input() disableFutureDays: boolean = false;

  @Output() newDayEvent = new EventEmitter<Date>();
  
  getClassForDay(day: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.isSelected) {
      return 'bg-dpprimary-500 text-white hover:cursor-pointer';
    } else if (today.getTime() === day.getTime()) {
      return 'bg-dpsecondary-500 text-white hover:cursor-pointer';
    } else if (day.getMonth() != this.calendarMonth && this.disableFutureDays && day.getTime() > today.getTime()) {
      return 'text-dpprimary-600 opacity-60 hover:cursor-default';
    } else if (day.getMonth() != this.calendarMonth) {
      return 'text-dpprimary-600 opacity-60 hover:cursor-pointer hover:bg-dpsecondary-200';
    } else if (this.disableFutureDays && day.getTime() > today.getTime()) {
      return 'text-dpsecondary-700 opacity-60 hover:cursor-default';
    }

    return 'text-dpsecondary-700 hover:bg-dpprimary-200 hover:cursor-pointer';
  }

  clickDay() {
    this.newDayEvent.emit(this.day);
  }
}
