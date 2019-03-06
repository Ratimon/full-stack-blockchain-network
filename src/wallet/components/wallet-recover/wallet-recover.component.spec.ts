import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletRecoverComponent } from './wallet-recover.component';

describe('WalletRecoverComponent', () => {
  let component: WalletRecoverComponent;
  let fixture: ComponentFixture<WalletRecoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletRecoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
