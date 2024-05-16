/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaymentDataServiceService } from './paymentSharedDataService.service';

describe('Service: PaymentDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentDataServiceService]
    });
  });

  it('should ...', inject([PaymentDataServiceService], (service: PaymentDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
