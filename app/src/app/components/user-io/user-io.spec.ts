import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIO } from './user-io';

describe('UserIO', () => {
  let component: UserIO;
  let fixture: ComponentFixture<UserIO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIO]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIO);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
