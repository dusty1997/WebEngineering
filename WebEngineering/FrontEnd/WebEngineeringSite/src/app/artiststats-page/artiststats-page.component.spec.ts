import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistStatsPageComponent } from './artiststats-page.component';

describe('ArtistStatsPageComponent', () => {
  let component: ArtistStatsPageComponent;
  let fixture: ComponentFixture<ArtistStatsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistStatsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
