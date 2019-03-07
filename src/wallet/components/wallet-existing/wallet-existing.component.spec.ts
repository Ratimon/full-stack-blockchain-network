import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletExistingComponent } from './wallet-existing.component';

describe('WalletExistingComponent', () => {
  let component: WalletExistingComponent;
  let fixture: ComponentFixture<WalletExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
