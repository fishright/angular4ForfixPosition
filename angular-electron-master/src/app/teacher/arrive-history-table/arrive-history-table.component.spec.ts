import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriveHistoryTableComponent } from './arrive-history-table.component';

describe('ArriveHistoryTableComponent', () => {
  let component: ArriveHistoryTableComponent;
  let fixture: ComponentFixture<ArriveHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArriveHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArriveHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
