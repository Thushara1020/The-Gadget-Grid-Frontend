import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createaccountcomponent } from './createaccountcomponent';

describe('Createaccountcomponent', () => {
  let component: Createaccountcomponent;
  let fixture: ComponentFixture<Createaccountcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createaccountcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createaccountcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
