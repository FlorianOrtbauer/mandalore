import { TestBed } from '@angular/core/testing';

import { SiteSelectionService } from './site-selection.service';

describe('SiteSelectionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteSelectionService = TestBed.get(SiteSelectionService);
    expect(service).toBeTruthy();
  });
});
