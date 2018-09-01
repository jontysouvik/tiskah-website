import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTasksComponent } from './run-tasks.component';

describe('RunTasksComponent', () => {
  let component: RunTasksComponent;
  let fixture: ComponentFixture<RunTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
