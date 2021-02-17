import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterGuideDialogComponent } from './register-guide-dialog.component';

describe('RegisterGuideDialogComponent', () => {
  let component: RegisterGuideDialogComponent;
  let fixture: ComponentFixture<RegisterGuideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterGuideDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterGuideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
