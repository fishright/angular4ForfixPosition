import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSeatNumbersComponent } from './check-seat-numbers.component';

describe('CheckSeatNumbersComponent', () => {
  let component: CheckSeatNumbersComponent;
  let fixture: ComponentFixture<CheckSeatNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckSeatNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSeatNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
