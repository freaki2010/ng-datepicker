import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment/min/moment-with-locales';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe);

@Component({
  selector: 'yatafu-datepicker-tailwind',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  getClassForDay(day: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.value.getTime() === day.getTime()) {
      return 'bg-dpprimary-500 text-white hover:cursor-pointer';
    } else if (today.getTime() === day.getTime()) {
      return 'bg-dpsecondary-500 text-white hover:cursor-pointer';
    } else if (day.getMonth() != this.month && this.disableFutureDays && day.getTime() > today.getTime()) {
      return 'text-dpprimary-500 opacity-60 hover:cursor-default';
    } else if (day.getMonth() != this.month) {
      return 'text-dpprimary-500 opacity-60 hover:cursor-pointer';
    } else if (this.disableFutureDays && day.getTime() > today.getTime()) {
      return 'text-dpsecondary-700 opacity-60 hover:cursor-default';
    }

    return 'text-dpsecondary-700 hover:bg-dpprimary-200 hover:cursor-pointer';
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
