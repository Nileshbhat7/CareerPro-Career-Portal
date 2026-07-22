import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-details.component.html'
})
export class JobDetailsComponent implements OnInit {
  job?: Job;
  recentlyViewedJobs: Job[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const jobId = Number(idStr);
        const fetchedJob = this.jobService.getJobById(jobId);
        
        if (fetchedJob) {
          this.job = fetchedJob;
          // Mark job as viewed in mock database
          this.jobService.markAsViewed(jobId);
          // Refresh recently viewed items
          this.loadRecentlyViewed(jobId);
        } else {
          // Job not found, redirect to 404
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }
    });
  }

  get isBookmarked(): boolean {
    return this.job ? this.jobService.isBookmarked(this.job.id) : false;
  }

  toggleBookmark() {
    if (this.job) {
      this.jobService.toggleBookmark(this.job.id);
    }
  }

  loadRecentlyViewed(currentId: number) {
    const ids = this.jobService.recentlyViewedIds();
    // Fetch detailed job details for recently viewed, excluding current job
    this.recentlyViewedJobs = ids
      .filter(id => id !== currentId)
      .map(id => this.jobService.getJobById(id))
      .filter((j): j is Job => !!j)
      .slice(0, 3);
  }

  goBack() {
    window.history.back();
  }
}
