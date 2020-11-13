import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsPageComponent } from './actors-page.component';

describe('ActorsPageComponent', () => {
  let component: ActorsPageComponent;
  let fixture: ComponentFixture<ActorsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
