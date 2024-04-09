import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment/min/moment-with-locales';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { DayComponent } from './day/day.component';

registerLocaleData(localeDe);

@Component({
  selector: 'yatafu-datepicker-tailwind',
  standalone: true,
  imports: [CommonModule, FormsModule, DayComponent],
  templateUrl: './datepicker-tailwind.component.html',
  styleUrl: './datepicker-tailwind.component.scss',
})
export class DatepickerTailwindComponent implements OnInit {
  showDatepicker = false;
  month: number;
  year: number;
  daysOfMonth: Date[] = [];
  preMonthDays: Date[] = [];
  postMonthDays: Date[] = [];
  userLocale: string;
  @Input() formInputId: string = 'datepicker';
  @Input() formInputLabel: string = 'Select Date';
  @Input() disableFutureDays: boolean = false;

  _value: Date;
  @Input()
  set value(value: Date) {
    value.setHours(0, 0, 0, 0);

    this._value = value;
    this.month = this.value.getMonth();
    this.year = this.value.getFullYear();

    this.valueChange.emit(value);
  }
  get value(): Date {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<Date>();

  constructor() {
    this._value = new Date();
    this._value.setHours(0, 0, 0, 0);

    this.month = this.value.getMonth();
    this.year = this.value.getFullYear();

    this.userLocale = navigator.language || navigator.languages[0];
  }

  ngOnInit(): void {
    this.updateCalendarEntries();
  }

  setDateValue(date: Date) {
    if (this.disableFutureDays && date.getTime() > new Date().getTime()) {
      return;
    }

    this.value = date;
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.updateCalendarEntries();
  }

  updateCalendarEntries() {
    this.daysOfMonth = [];
    const firstDay = new Date(this.year, this.month);
    this.setPreCurrentMonthDays(firstDay);
    this.setDaysOfMonth(firstDay);
    this.setPostCurrentMonthDays();
  }

  private setPreCurrentMonthDays(firstDay: Date) {
    let dayOfWeek = firstDay.getDay();
    let preMonthDay = firstDay.getTime();

    for (let i = 0; i < dayOfWeek; i++) {
      preMonthDay = firstDay.getTime() - 86400000 * (dayOfWeek - i);
      this.daysOfMonth.push(new Date(preMonthDay));
    }
  }

  private setDaysOfMonth(currentDay: Date) {
    while (currentDay.getMonth() == this.month) {
      this.daysOfMonth.push(currentDay);
      currentDay = new Date(this.year, this.month, currentDay.getDate() + 1);
    }
  }

  private setPostCurrentMonthDays() {
    let dayOfWeek = this.daysOfMonth[this.daysOfMonth.length - 1].getDay() + 1;
    let postMonthDays = this.daysOfMonth[this.daysOfMonth.length - 1].getTime();

    for (let i = dayOfWeek; i < 7; i++) {
      postMonthDays += 86400000;
      this.daysOfMonth.push(new Date(postMonthDays));
    }
  }

  getMonthName(): string {
    return moment(this.month + 1, 'M')
      .locale(this.userLocale)
      .format('MMMM');
  }

  getDayName(day: number): string {
    return moment(day, 'e')
    .locale(this.userLocale)
    .format('ddd')
  }

  decreaseMonth(): void {
    if (this.month === 0) {
      this.month = 11;
      --this.year;
      return;
    }

    --this.month;
  }

  increaseMonth(): void {
    if (this.month === 11) {
      this.month = 0;
      ++this.year;
      return;
    }

    ++this.month;
  }
}
