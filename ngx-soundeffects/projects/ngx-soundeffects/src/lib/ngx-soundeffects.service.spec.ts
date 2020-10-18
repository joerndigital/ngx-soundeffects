import { TestBed } from '@angular/core/testing';

import { NgxSoundeffectsService } from './ngx-soundeffects.service';

describe('NgxSoundeffectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSoundeffectsService = TestBed.get(NgxSoundeffectsService);
    expect(service).toBeTruthy();
  });
});
