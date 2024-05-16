/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeizureService } from './seizure.service';

describe('Service: Seizure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeizureService]
    });
  });

  it('should ...', inject([SeizureService], (service: SeizureService) => {
    expect(service).toBeTruthy();
  }));
});
