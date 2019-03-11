import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaucetFormComponent } from './faucet-form.component';

describe('FaucetFormComponent', () => {
  let component: FaucetFormComponent;
  let fixture: ComponentFixture<FaucetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaucetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaucetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
