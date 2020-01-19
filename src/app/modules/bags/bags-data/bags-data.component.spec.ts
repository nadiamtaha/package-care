import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BagsDataComponent } from './bags-data.component';

describe('BagsDataComponent', () => {
  let component: BagsDataComponent;
  let fixture: ComponentFixture<BagsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BagsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BagsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
