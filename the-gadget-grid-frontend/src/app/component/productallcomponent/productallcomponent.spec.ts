import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productallcomponent } from './productallcomponent';

describe('Productallcomponent', () => {
  let component: Productallcomponent;
  let fixture: ComponentFixture<Productallcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productallcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productallcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
