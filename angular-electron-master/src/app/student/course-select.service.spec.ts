import { TestBed, inject } from '@angular/core/testing';

import { CourseSelectService } from './course-select.service';

describe('CourseSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseSelectService]
    });
  });

  it('should be created', inject([CourseSelectService], (service: CourseSelectService) => {
    expect(service).toBeTruthy();
  }));
});
