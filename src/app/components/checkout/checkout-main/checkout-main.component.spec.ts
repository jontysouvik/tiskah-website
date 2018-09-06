import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutMainComponent } from './checkout-main.component';

describe('CheckoutMainComponent', () => {
  let component: CheckoutMainComponent;
  let fixture: ComponentFixture<CheckoutMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
