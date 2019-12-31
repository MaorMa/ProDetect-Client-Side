import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientViewComponent } from './nutrient-view.component';

describe('NutrientViewComponent', () => {
  let component: NutrientViewComponent;
  let fixture: ComponentFixture<NutrientViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrientViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
