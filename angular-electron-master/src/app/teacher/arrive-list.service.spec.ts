import { TestBed, inject } from '@angular/core/testing';

import { ArriveListService } from './arrive-list.service';

describe('ArriveListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArriveListService]
    });
  });

  it('should be created', inject([ArriveListService], (service: ArriveListService) => {
    expect(service).toBeTruthy();
  }));
});
