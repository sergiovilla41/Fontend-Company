/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeizureSharedDataService } from './seizureSharedData.service';

describe('Service: SeizureSharedData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeizureSharedDataService]
    });
  });

  it('should ...', inject([SeizureSharedDataService], (service: SeizureSharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
