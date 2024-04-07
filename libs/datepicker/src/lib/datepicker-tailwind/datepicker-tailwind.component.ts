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
  DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  showDatepicker = false;
  month: number;
  year: number;
  daysOfMonth: Date[] = [];
  preMonthDays: Date[] = [];
  postMonthDays: Date[] = [];
  userLocale: string;
  @Input() id: string = 'datepicker';
  @Input() label: string = 'Select Date';
  @Input() disableFutureDays: boolean = false;

  _value: Date;
  @Input()
  set value(value: Date) {
    value.setHours(0, 0, 0, 0);
    this._value = value;
    this.valueChange.emit(value);
  }
  get value(): Date {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<Date>();

  constructor() {
    // TODO kein plan check
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
      return 'bg-slate-500 text-white';
    } else if (today.getTime() === day.getTime()) {
      return 'bg-blue-500 text-white';
    } else if (this.disableFutureDays && day.getTime() > today.getTime()) {
      return 'text-gray-700 opacity-60 hover:cursor-default';
    }

    return 'text-gray-700 hover:bg-blue-200';
  }

  setDateValue(date: Date) {
    if (this.disableFutureDays && date.getTime() > new Date().getTime()) {
      return;
    }

    this.value = date;
    this.showDatepicker = false;
  }

  updateCalendarEntries() {
    this.setDaysOfMonth();
    this.setPreCurrentMonthDays();
    this.setPostCurrentMonthDays();
  }

  private setDaysOfMonth() {
    let currentDay = new Date(this.year, this.month);

    const days = [];
    while (currentDay.getMonth() == this.month) {
      days.push(currentDay);
      currentDay = new Date(this.year, this.month, currentDay.getDate() + 1);
    }
    this.daysOfMonth = days;
  }

  private setPreCurrentMonthDays() {
    let dayOfWeek = this.daysOfMonth[0].getDay();
    let dates = [];
    let preMonthDays = this.daysOfMonth[0].getTime();

    for (let i = 1; i <= dayOfWeek; i++) {
      preMonthDays -= 86400000;
      dates.push(new Date(preMonthDays));
    }

    this.preMonthDays = dates;
  }

  private setPostCurrentMonthDays() {
    let dayOfWeek = this.daysOfMonth[this.daysOfMonth.length - 1].getDay() + 1;
    let dates = [];
    let postMonthDays = this.daysOfMonth[this.daysOfMonth.length - 1].getTime();

    for (let i = dayOfWeek; i < 7; i++) {
      postMonthDays += 86400000;
      dates.push(new Date(postMonthDays));
    }

    this.postMonthDays = dates;
  }

  getMonthName(): string {
    return moment(this.month + 1, 'M')
      .locale(this.userLocale)
      .format('MMMM');
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

  trackByIdentity = (index: number, item: any) => item;
}
