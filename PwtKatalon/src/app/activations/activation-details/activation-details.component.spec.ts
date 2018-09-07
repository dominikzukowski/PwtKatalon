import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationDetailsComponent } from './activation-details.component';

describe('ActivationDetailsComponent', () => {
  let component: ActivationDetailsComponent;
  let fixture: ComponentFixture<ActivationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
