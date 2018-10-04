import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestJobsComponent } from './latest-jobs.component';

describe('LatestJobsComponent', () => {
  let component: LatestJobsComponent;
  let fixture: ComponentFixture<LatestJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
