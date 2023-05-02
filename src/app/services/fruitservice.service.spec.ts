import { TestBed } from '@angular/core/testing';

import { FruitserviceService } from './fruitservice.service';

describe('FruitserviceService', () => {
  let service: FruitserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
