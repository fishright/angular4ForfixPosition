import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatNumbersComponent } from './seat-numbers.component';

describe('SeatNumbersComponent', () => {
  let component: SeatNumbersComponent;
  let fixture: ComponentFixture<SeatNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
