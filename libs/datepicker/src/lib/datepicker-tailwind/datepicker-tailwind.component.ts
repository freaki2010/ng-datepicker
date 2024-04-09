import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment/min/moment-with-locales';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Day, DayComponent } from './day/day.component';

registerLocaleData(localeDe);

export class FormInput {
  constructor(
    public label: string,
    public id: string,
  ){}
}

@Component({
  selector: 'lib-yatafu-datepicker-tw',
  standalone: true,
  imports: [CommonModule, FormsModule, DayComponent],
  templateUrl: './datepicker-tailwind.component.html',
  styleUrl: './datepicker-tailwind.component.scss',
})
export class DatepickerTailwindComponent implements OnInit {
  showDatepicker = false;
  month: number;
  year: number;
  daysOfMonth: Day[] = [];
  userLocale: string;
  @Input() formInput: FormInput = new FormInput('Select date', 'yatafu-datepicker')
  @Input() disableFutureDays = false;

  _selectedDate: Date;
  @Input()
  set selectedDate(selectedDate: Date) {
    selectedDate.setHours(0, 0, 0, 0);

    this._selectedDate = selectedDate;
    this.month = this.selectedDate.getMonth();
    this.year = this.selectedDate.getFullYear();

    this.valueChange.emit(selectedDate);
  }

  get selectedDate(): Date {
    return this._selectedDate;
  }

  @Output() valueChange = new EventEmitter<Date>();

  constructor() {
    this._selectedDate = new Date();

    this.month = this.selectedDate.getMonth();
    this.year = this.selectedDate.getFullYear();

    this.userLocale = navigator.language || navigator.languages[0];
  }

  ngOnInit(): void {
    this.updateCalendarEntries();
  }

  toggleDatepicker() {
    this.showDatepicker = !this.showDatepicker;
  }

  selectDate(date: Date) {
    if (this.disableFutureDays && date.getTime() > new Date().getTime()) {
      return;
    }

    this.selectedDate = date;

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
    const dayOfWeek = firstDay.getDay();
    let preMonthDay = firstDay.getTime();

    for (let i = 0; i < dayOfWeek; i++) {
      preMonthDay = firstDay.getTime() - 86400000 * (dayOfWeek - i);

      this.daysOfMonth.push(this.createDayObject(new Date(preMonthDay)));
    }
  }

  private setDaysOfMonth(currentDay: Date) {
    while (currentDay.getMonth() == this.month) {
      this.daysOfMonth.push(this.createDayObject(new Date(currentDay), true));

      currentDay = new Date(this.year, this.month, currentDay.getDate() + 1);
    }
  }

  private setPostCurrentMonthDays() {
    const dayOfWeek = this.daysOfMonth[this.daysOfMonth.length - 1].date.getDay() + 1;
    let postMonthDays = this.daysOfMonth[this.daysOfMonth.length - 1].date.getTime();

    for (let i = dayOfWeek; i < 7; i++) {
      postMonthDays += 86400000;

      this.daysOfMonth.push(this.createDayObject(new Date(postMonthDays)));
    }
  }

  private createDayObject(date: Date, isInCalendarMonth = false): Day 
  {
      const today = new Date()
      today.setHours(0,0,0,0)

      return new Day(
        date,
        isInCalendarMonth,
        (this._selectedDate.getTime() === date.getTime()),
        (this.disableFutureDays && date.getTime() > today.getTime()),
        (today.getTime() === date.getTime())
      )
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
