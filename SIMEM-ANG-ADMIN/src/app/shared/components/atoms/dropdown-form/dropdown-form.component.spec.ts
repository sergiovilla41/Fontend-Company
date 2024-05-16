import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFormComponent } from './dropdown-form.component';

describe('DropdownFormComponent', () => {
  let component: DropdownFormComponent;
  let fixture: ComponentFixture<DropdownFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DropdownFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.itemObject.itemSelected = undefined as any
    component.itemObject.items = [{code: "hola mundo"} as any]
    component.ngOnChanges({ disabled: { currentValue: true, previousValue: false, firstChange: true, isFirstChange: () => true } })
    component.itemObject.itemSelected = "hola mundo"
    component.ngOnChanges({ disable: { currentValue: true, previousValue: false, firstChange: true, isFirstChange: () => true } })
    component.onChange({code: "hola"} as any)
  });
});
