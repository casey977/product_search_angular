import { TestBed } from '@angular/core/testing';

import { ListgetterService } from './listgetter.service';

describe('ListgetterService', () => {
  let service: ListgetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListgetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
