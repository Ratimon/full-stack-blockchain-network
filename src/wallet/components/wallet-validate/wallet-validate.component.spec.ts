import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletValidateComponent } from './wallet-validate.component';

describe('WalletValidateComponent', () => {
  let component: WalletValidateComponent;
  let fixture: ComponentFixture<WalletValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletValidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
