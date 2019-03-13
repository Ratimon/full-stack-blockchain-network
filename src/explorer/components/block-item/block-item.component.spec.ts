import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockItemComponent } from './block-item.component';

describe('BlockItemComponent', () => {
  let component: BlockItemComponent;
  let fixture: ComponentFixture<BlockItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
