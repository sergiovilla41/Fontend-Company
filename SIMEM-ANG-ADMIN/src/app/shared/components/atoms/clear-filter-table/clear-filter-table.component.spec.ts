import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearFilterTableComponent } from './clear-filter-table.component';

describe('ClearFilterTableComponent', () => {
  let component: ClearFilterTableComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClearFilterTableComponent],
    });
    component = TestBed.inject(ClearFilterTableComponent);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('clearFilter should be called', () => {
    component.tableData = { reset() { } } as any
    component.clearFilter();
  });
});
