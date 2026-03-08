import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatorDisplay } from './emulator-display';

describe('EmulatorDisplay', () => {
  let component: EmulatorDisplay;
  let fixture: ComponentFixture<EmulatorDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmulatorDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmulatorDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
