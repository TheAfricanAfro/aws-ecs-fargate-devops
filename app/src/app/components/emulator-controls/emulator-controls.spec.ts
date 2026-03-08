import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmulatorControls } from './emulator-controls';

describe('EmulatorControls', () => {
  let component: EmulatorControls;
  let fixture: ComponentFixture<EmulatorControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmulatorControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmulatorControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
