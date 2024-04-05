import { TestBed } from '@angular/core/testing';

import { NbreEmployeService } from './nbre-employe.service';

describe('NbreEmployeService', () => {
  let service: NbreEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbreEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
