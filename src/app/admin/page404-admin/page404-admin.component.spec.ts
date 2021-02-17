import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404AdminComponent } from './page404-admin.component';

describe('Page404AdminComponent', () => {
  let component: Page404AdminComponent;
  let fixture: ComponentFixture<Page404AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page404AdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
