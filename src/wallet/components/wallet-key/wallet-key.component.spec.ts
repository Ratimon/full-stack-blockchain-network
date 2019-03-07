import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletKeyComponent } from './wallet-key.component';

describe('WalletKeyComponent', () => {
  let component: WalletKeyComponent;
  let fixture: ComponentFixture<WalletKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
