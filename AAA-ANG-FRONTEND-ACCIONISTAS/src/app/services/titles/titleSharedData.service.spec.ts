/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TitleSharedDataService } from './titleSharedData.service';

describe('Service: TitleSharedData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleSharedDataService]
    });
  });

  it('should ...', inject([TitleSharedDataService], (service: TitleSharedDataService) => {
    expect(service).toBeTruthy();
  }));
});
