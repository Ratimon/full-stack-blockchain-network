import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletMineComponent } from './wallet-mine.component';

describe('WalletValidateComponent', () => {
  let component: WalletMineComponent;
  let fixture: ComponentFixture<WalletMineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletMineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletMineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
