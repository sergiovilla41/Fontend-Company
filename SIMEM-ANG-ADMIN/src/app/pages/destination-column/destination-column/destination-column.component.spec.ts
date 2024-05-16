import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DestinationColumnComponent } from './destination-column.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MatNativeDateModule } from '@angular/material/core';
import { Store, StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { State } from '../../../store/model/state.model';
import { selectDestinationColumns, selectDestinationColumnStatusSave } from '../../../store/selectors/destination-column/destination.column.selector';
import { of } from 'rxjs';

describe('DestinationColumnComponent', () => {
  let component: DestinationColumnComponent;
  let fixture: ComponentFixture<DestinationColumnComponent>;
  let store: Store<State>;
  let selectSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ToastModule,
        MatNativeDateModule,
        StoreModule.forRoot({})
      ],
      providers: [MessageService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationColumnComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    selectSpy = spyOn(store, 'select').and.returnValue(of([]));
    spyOn(store, 'dispatch').and.stub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch destination columns on initialization', () => {
    spyOn(component, 'fetchDestinationColumn').and.stub();
    component.ngOnInit();
    expect(component.fetchDestinationColumn).toHaveBeenCalled();
  });

  it('should handle successful save status', () => {
    spyOn(component, 'fetchDestinationColumn').and.stub();
    component.ngOnInit();
    expect(component.destinationColumns).toEqual([]);
    expect(component.fetchDestinationColumn).toHaveBeenCalled();
  });

  it('should handle error status', () => {
    selectSpy.and.callFake((selector: any) => {
      if (selector === selectDestinationColumnStatusSave) {
        return of('error');
      }
      return of([]);
    });

    component.ngOnInit();
  });
});
