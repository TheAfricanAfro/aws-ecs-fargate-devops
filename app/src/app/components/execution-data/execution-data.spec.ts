import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionData } from './execution-data';

describe('ExecutionData', () => {
  let component: ExecutionData;
  let fixture: ComponentFixture<ExecutionData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
