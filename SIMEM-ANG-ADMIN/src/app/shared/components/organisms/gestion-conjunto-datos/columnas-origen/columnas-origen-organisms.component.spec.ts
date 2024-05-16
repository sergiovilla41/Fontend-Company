import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnasOrigenOrganismsComponent } from './columnas-origen-organisms.component';

describe('ColumnasOrigenOrganismsComponent', () => {
  let component: ColumnasOrigenOrganismsComponent;
  let fixture: ComponentFixture<ColumnasOrigenOrganismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnasOrigenOrganismsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ColumnasOrigenOrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.idSourceColumn = "hola"
    component.sourceColumns = [{ idSourceColumn: "hola", idTargetColumn: "hola", originColumn: "hola" } as any]
    component.sourceColumnsData = [{ idSourceColumn: "hola", originColumn: null } as any]
    component.targetColumn = [{ code: "hola" } as any, { name: "sctargetColumn" } as any, { name: "csExidColumnaDestino" } as any, { name: "csExidColumnaVersion" } as any]
    component.ngOnChanges()
    component.onRowEditInit("hola")
    component.handledDropDownNewValue({ name: "sctargetColumn" } as any)
    component.handledDropDownNewValue({ name: "csExidColumnaDestino" } as any)
    component.handledDropDownNewValue({ name: "csExidColumnaVersion" } as any)
    component.handledDropDownNewValue({ name: "hola" } as any)
    component.onRowEditCancel()
    component.onValidateSave()
    component.onRowEditSave()
    component.saveColumnTargetVersion()
    component.changeTargetColumn({ value: "hola" } as any)
  });
});
