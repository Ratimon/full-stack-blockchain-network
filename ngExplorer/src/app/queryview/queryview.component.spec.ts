import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryviewComponent } from './queryview.component';

describe('QueryviewComponent', () => {
  let component: QueryviewComponent;
  let fixture: ComponentFixture<QueryviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
