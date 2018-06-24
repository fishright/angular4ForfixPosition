import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriveTableComponent } from './arrive-table.component';

describe('ArriveTableComponent', () => {
  let component: ArriveTableComponent;
  let fixture: ComponentFixture<ArriveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArriveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
