import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperDivisionComponent } from './upper-division.component';

describe('UpperDivisionComponent', () => {
  let component: UpperDivisionComponent;
  let fixture: ComponentFixture<UpperDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperDivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
