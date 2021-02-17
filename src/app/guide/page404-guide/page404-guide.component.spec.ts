import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page404GuideComponent } from './page404-guide.component';

describe('Page404GuideComponent', () => {
  let component: Page404GuideComponent;
  let fixture: ComponentFixture<Page404GuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page404GuideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page404GuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
