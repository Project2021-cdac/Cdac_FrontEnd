import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404StudentComponent } from './page404-student.component';

describe('Page404StudentComponent', () => {
  let component: Page404StudentComponent;
  let fixture: ComponentFixture<Page404StudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page404StudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
