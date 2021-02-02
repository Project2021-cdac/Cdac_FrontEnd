import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamSizeComponent } from './edit-team-size.component';

describe('EditTeamSizeComponent', () => {
  let component: EditTeamSizeComponent;
  let fixture: ComponentFixture<EditTeamSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTeamSizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
