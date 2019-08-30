import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesTreeComponent } from './processes-tree.component';

describe('ProcessesTreeComponent', () => {
  let component: ProcessesTreeComponent;
  let fixture: ComponentFixture<ProcessesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
