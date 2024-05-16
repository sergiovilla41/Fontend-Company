/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WarrantySharedDataService } from './warrantySharedData.service';

describe('Service: WarrantySharedData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WarrantySharedDataService]
    });
  });

  it('should ...', inject([WarrantySharedDataService], (service: WarrantySharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
