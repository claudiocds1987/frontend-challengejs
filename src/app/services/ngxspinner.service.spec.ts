import { TestBed } from '@angular/core/testing';

import { NgxspinnerService } from './ngxspinner.service';

describe('NgxspinnerService', () => {
  let service: NgxspinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxspinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
