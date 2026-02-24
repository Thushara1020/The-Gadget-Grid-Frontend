import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productcomponent } from './productcomponent';

describe('Productcomponent', () => {
  let component: Productcomponent;
  let fixture: ComponentFixture<Productcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
