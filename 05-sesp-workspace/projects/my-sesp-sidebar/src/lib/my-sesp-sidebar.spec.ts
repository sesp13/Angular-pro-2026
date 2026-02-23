import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySespSidebar } from './my-sesp-sidebar';

describe('MySespSidebar', () => {
  let component: MySespSidebar;
  let fixture: ComponentFixture<MySespSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySespSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySespSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
