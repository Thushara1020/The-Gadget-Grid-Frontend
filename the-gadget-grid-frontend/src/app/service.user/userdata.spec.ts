import { TestBed } from '@angular/core/testing';

import { Userdata } from './userdata';

describe('Userdata', () => {
  let service: Userdata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
