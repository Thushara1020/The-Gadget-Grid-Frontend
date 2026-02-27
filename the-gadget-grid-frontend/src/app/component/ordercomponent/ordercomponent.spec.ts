import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordercomponent } from './ordercomponent';

describe('Ordercomponent', () => {
  let component: Ordercomponent;
  let fixture: ComponentFixture<Ordercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ordercomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ordercomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
