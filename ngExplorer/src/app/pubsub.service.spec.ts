import { TestBed } from '@angular/core/testing';

import { PubsubService } from './pubsub.service';

describe('PubsubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubsubService = TestBed.get(PubsubService);
    expect(service).toBeTruthy();
  });
});
