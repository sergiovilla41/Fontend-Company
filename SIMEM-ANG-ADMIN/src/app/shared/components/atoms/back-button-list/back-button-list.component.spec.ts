import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonListComponent } from './back-button-list.component';

describe('BackButtonListComponent', () => {
  let component: BackButtonListComponent;
  let fixture: ComponentFixture<BackButtonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackButtonListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
