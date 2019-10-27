import { TestBed } from '@angular/core/testing';

import { SiteSelectionServiceService } from './site-selection-service.service';

describe('SiteSelectionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteSelectionServiceService = TestBed.get(SiteSelectionServiceService);
    expect(service).toBeTruthy();
  });
});
