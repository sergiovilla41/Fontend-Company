import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTableCategoryModalComponent } from './tree-table-category-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TreeTableCategoryModalComponent', () => {
  let component: TreeTableCategoryModalComponent;
  let fixture: ComponentFixture<TreeTableCategoryModalComponent>;
  const matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        TreeTableCategoryModalComponent,
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { treeTableCategory: [], idCategorySelected: '' },
        },
      ],
    });

    fixture = TestBed.createComponent(TreeTableCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit() should be called', () => {
    component.data.idCategorySelected = "hola"
    component.data.treeTableCategory = [{ data: { id: "hola" } as any, expanded: false, key: "hola", label: "label", children: [{ data: { id: "hola" } as any, expanded: false, key: "hola", label: "label" }] }]
    component.ngOnInit();
    component.data.treeTableCategory = [{ data: { id: "hla" } as any, expanded: false, key: "hola", label: "label", children: [{ data: { id: "hola" } as any, expanded: false, key: "hola", label: "label" }] }]
    component.ngOnInit();
    component.data.treeTableCategory = [{ data: { id: "hla" } as any, expanded: false, key: "hola", label: "label", children: [{ data: { id: "hla" } as any, expanded: false, key: "hola", label: "label" }] }]
    component.ngOnInit();
    component.close()
    component.onselecCategory()
  });

  it('#onNoClick() should be called', () => {
    component.onNoClick();
  });

  it('#onNodeSelect() should be called', () => {
    component.onNodeSelect({node: {key: "123"}});
    component.onNodeSelect({node: {key: "1234"}});
  });
});
