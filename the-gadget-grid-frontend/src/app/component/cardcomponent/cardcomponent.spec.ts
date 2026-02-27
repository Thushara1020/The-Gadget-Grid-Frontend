import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cardcomponent } from './cardcomponent';

describe('Cardcomponent', () => {
  let component: Cardcomponent;
  let fixture: ComponentFixture<Cardcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cardcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cardcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
