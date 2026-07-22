import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { JobCardComponent } from './job-card.component';
import { Job } from '../../../models/job.model';

describe('JobCardComponent', () => {
  let component: JobCardComponent;
  let fixture: ComponentFixture<JobCardComponent>;

  const mockJob: Job = {
    id: 1,
    title: 'Angular Developer',
    company: 'Test Company',
    location: 'Ahmedabad',
    experience: '2-4 Years',
    type: 'Full Time',
    workplace: 'Hybrid',
    salary: '8-12 LPA',
    postedDate: '2026-07-20',
    skills: ['Angular', 'TypeScript'],
    description: 'Test description',
    responsibilities: ['Test resp'],
    benefits: ['Test benefit'],
    companyInfo: 'Test info'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(JobCardComponent);
    component = fixture.componentInstance;
    component.job = mockJob; // Required input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
