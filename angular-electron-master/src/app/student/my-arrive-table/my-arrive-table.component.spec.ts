import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArriveTableComponent } from './my-arrive-table.component';

describe('MyArriveTableComponent', () => {
  let component: MyArriveTableComponent;
  let fixture: ComponentFixture<MyArriveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArriveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArriveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
