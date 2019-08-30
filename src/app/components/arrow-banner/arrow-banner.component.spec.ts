import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowBannerComponent } from './arrow-banner.component';

describe('ArrowBannerComponent', () => {
  let component: ArrowBannerComponent;
  let fixture: ComponentFixture<ArrowBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrowBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
