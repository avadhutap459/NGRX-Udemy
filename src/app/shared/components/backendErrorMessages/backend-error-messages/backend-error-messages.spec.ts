import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendErrorMessages } from './backend-error-messages';

describe('BackendErrorMessages', () => {
  let component: BackendErrorMessages;
  let fixture: ComponentFixture<BackendErrorMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackendErrorMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendErrorMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
