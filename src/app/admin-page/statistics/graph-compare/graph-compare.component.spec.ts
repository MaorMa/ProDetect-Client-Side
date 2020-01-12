import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCompareComponent } from './graph-compare.component';

describe('GraphCompareComponent', () => {
  let component: GraphCompareComponent;
  let fixture: ComponentFixture<GraphCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
