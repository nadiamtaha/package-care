import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorsDataComponent } from './vendors-data.component';

describe('VendorsDataComponent', () => {
  let component: VendorsDataComponent;
  let fixture: ComponentFixture<VendorsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
