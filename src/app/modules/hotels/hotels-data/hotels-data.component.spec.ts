import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsDataComponent } from './hotels-data.component';

describe('HotelsDataComponent', () => {
  let component: HotelsDataComponent;
  let fixture: ComponentFixture<HotelsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
