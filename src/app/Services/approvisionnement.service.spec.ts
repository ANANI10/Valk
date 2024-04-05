import { TestBed } from '@angular/core/testing';

import { ApprovisionnementService } from './approvisionnement.service';

describe('ApprovisionnementService', () => {
  let service: ApprovisionnementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovisionnementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
