import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsHolderComponent } from './applications-holder.component';

describe('ApplicationsHolderComponent', () => {
  let component: ApplicationsHolderComponent;
  let fixture: ComponentFixture<ApplicationsHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationsHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
