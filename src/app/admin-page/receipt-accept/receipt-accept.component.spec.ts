import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptAcceptComponent } from './receipt-accept.component';

describe('ReceiptAcceptComponent', () => {
  let component: ReceiptAcceptComponent;
  let fixture: ComponentFixture<ReceiptAcceptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptAcceptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
