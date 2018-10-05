import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationsPagedlistComponent } from './activations-pagedlist.component';

describe('ActivationsPagedlistComponent', () => {
  let component: ActivationsPagedlistComponent;
  let fixture: ComponentFixture<ActivationsPagedlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationsPagedlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationsPagedlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
