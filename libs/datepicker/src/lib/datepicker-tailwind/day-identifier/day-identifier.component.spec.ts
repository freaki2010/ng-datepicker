import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayIdentifierComponent } from './day-identifier.component';

describe('DayIdentifierComponent', () => {
  let component: DayIdentifierComponent;
  let fixture: ComponentFixture<DayIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayIdentifierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
