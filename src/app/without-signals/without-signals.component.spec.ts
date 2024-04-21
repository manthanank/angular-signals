import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutSignalsComponent } from './without-signals.component';

describe('WithoutSignalsComponent', () => {
  let component: WithoutSignalsComponent;
  let fixture: ComponentFixture<WithoutSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithoutSignalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithoutSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
