import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Orderpage } from './orderpage';

describe('Orderpage', () => {
  let component: Orderpage;
  let fixture: ComponentFixture<Orderpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Orderpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Orderpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
