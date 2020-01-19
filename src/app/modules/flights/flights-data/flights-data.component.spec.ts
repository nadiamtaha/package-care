import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsDataComponent } from './flights-data.component';

describe('FlightsDataComponent', () => {
  let component: FlightsDataComponent;
  let fixture: ComponentFixture<FlightsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
