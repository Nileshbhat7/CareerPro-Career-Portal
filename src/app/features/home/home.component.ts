import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  searchTitle: string = '';
  searchLocation: string = '';
  featuredJobs: Job[] = [];

  constructor(
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.featuredJobs = this.jobService.jobs().slice(0, 3);
  }

  onSearch(): void {
    const trimmedTitle = this.searchTitle.trim();
    const trimmedLocation = this.searchLocation.trim();

    this.jobService.resetFilters();
    if (trimmedTitle) {
      this.jobService.setSearch(trimmedTitle);
    }
    if (trimmedLocation) {
      this.jobService.toggleFilter('location', trimmedLocation);
    }
    this.router.navigate(['/jobs']);
  }

  trackByJobId(index: number, job: Job): number {
    return job.id;
  }

  trackBySkill(index: number, skill: string): string {
    return skill;
  }
}
