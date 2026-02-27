import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pradctpage } from './pradctpage';

describe('Pradctpage', () => {
  let component: Pradctpage;
  let fixture: ComponentFixture<Pradctpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pradctpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pradctpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
