import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import _moment from 'moment';
import {
  DatePickerObject,
  ItemNewValue,
} from '../../../../store/interfaces/common-interface';

const moment = _moment;

@Component({
  standalone: true,
  selector: 'simem-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrl: './calendar-form.component.scss',
  imports: [CalendarModule, CommonModule, FormsModule],
})
export class CalendarFormComponent {
  date: Date | undefined = new Date();
  @Input() dateObject: DatePickerObject = {
    date: null,
    name: '',
  };
  @Output() pickerNewDate = new EventEmitter<any>();

  ngOnInit() {
    if (
      typeof this.dateObject.date === 'undefined' ||
      this.dateObject.date === null
    )
      return;
    this.date = new Date(this.dateObject.date);
  }

  onChange(_newValue: Date) {
    if (_newValue === null) return;
    let newValue: ItemNewValue = {
      value: moment(_newValue).format('YYYY-MM-DD'),
      name: this.dateObject.name,
    };
    this.pickerNewDate.emit(newValue);
  }
}
