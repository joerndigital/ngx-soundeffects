import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSoundeffectsComponent } from './ngx-soundeffects.component';

describe('NgxSoundeffectsComponent', () => {
  let component: NgxSoundeffectsComponent;
  let fixture: ComponentFixture<NgxSoundeffectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSoundeffectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSoundeffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
