import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseScoreEditComponent } from './course-score-edit.component';

describe('CourseScoreEditComponent', () => {
  let component: CourseScoreEditComponent;
  let fixture: ComponentFixture<CourseScoreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseScoreEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseScoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
