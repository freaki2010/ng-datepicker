import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerTailwindComponent } from './datepicker-tailwind.component';

describe('DatepickerTailwindComponent', () => {
  let component: DatepickerTailwindComponent;
  let fixture: ComponentFixture<DatepickerTailwindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatepickerTailwindComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatepickerTailwindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
