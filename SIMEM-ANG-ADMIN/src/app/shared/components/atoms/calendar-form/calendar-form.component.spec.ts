import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFormComponent } from './calendar-form.component';

describe('CalendarFormComponent', () => {
  let component: CalendarFormComponent;
  let fixture: ComponentFixture<CalendarFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarFormComponent],
    });
    fixture = TestBed.createComponent(CalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.dateObject = {
      date: new Date(),
      name: '',
    };
    expect(component).toBeTruthy();
    component.onChange((null as any))
    component.onChange(new Date())
  });
});
