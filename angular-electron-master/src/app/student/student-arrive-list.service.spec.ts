import { TestBed, inject } from '@angular/core/testing';

import { StudentArriveListService } from './student-arrive-list.service';

describe('StudentArriveListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentArriveListService]
    });
  });

  it('should be created', inject([StudentArriveListService], (service: StudentArriveListService) => {
    expect(service).toBeTruthy();
  }));
});
