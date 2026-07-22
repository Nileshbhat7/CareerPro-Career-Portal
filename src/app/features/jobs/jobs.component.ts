import { Component, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

import { JobCardComponent } from '../../shared/components/job-card/job-card.component';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule, JobCardComponent],
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit, OnDestroy {
  // Filter Options referencing JobService lists
  locations: string[] = [];
  experiences: string[] = [];
  jobTypes: string[] = [];
  workplaces: string[] = [];

  showBookmarkedOnly = false;
  skeletonActive = false;
  private querySub?: Subscription;

  constructor(
    public jobService: JobService,
    private route: ActivatedRoute
  ) {
    this.locations = this.jobService.locationsList;
    this.experiences = this.jobService.experiencesList;
    this.jobTypes = this.jobService.jobTypesList;
    this.workplaces = this.jobService.workplacesList;
  }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(params => {
      const isBookmarks = params['bookmarkedOnly'] === 'true';
      // Reset filters when switching between Bookmarks and general Search list
      if (isBookmarks !== this.showBookmarkedOnly) {
        this.jobService.resetFilters();
      }
      this.showBookmarkedOnly = isBookmarks;
      this.jobService.currentPage.set(1);
    });
  }

  ngOnDestroy() {
    this.querySub?.unsubscribe();
  }

  // Jobs retrieval taking bookmarks parameter into account
  displayJobs() {
    const list = this.jobService.paginatedJobs();
    if (this.showBookmarkedOnly) {
      // Filter list to only show bookmarked jobs (client pagination on bookmarks)
      const allSortedBookmarked = this.jobService.sortedJobs().filter(job => 
        this.jobService.isBookmarked(job.id)
      );
      
      const pageIndex = this.jobService.currentPage() - 1;
      const size = this.jobService.pageSize();
      return allSortedBookmarked.slice(pageIndex * size, (pageIndex + 1) * size);
    }
    return list;
  }

  totalPages() {
    if (this.showBookmarkedOnly) {
      const totalItems = this.jobService.sortedJobs().filter(job => 
        this.jobService.isBookmarked(job.id)
      ).length;
      return Math.ceil(totalItems / this.jobService.pageSize()) || 1;
    }
    return this.jobService.totalPages();
  }

  currentPage() {
    return this.jobService.currentPage();
  }

  getPagesArray(): number[] {
    const pages = this.totalPages();
    const arr = [];
    for (let i = 1; i <= pages; i++) {
      arr.push(i);
    }
    return arr;
  }

  toggleBookmark(id: number) {
    this.jobService.toggleBookmark(id);
  }

  isBookmarked(id: number): boolean {
    return this.jobService.isBookmarked(id);
  }

  onSearchChange(val: string) {
    this.triggerSkeleton();
    this.jobService.setSearch(val);
  }

  onSortChange(val: string) {
    this.triggerSkeleton();
    this.jobService.setSort(val);
  }

  resetFilters() {
    this.triggerSkeleton();
    this.jobService.resetFilters();
  }

  prevPage() {
    this.jobService.setPage(this.currentPage() - 1);
  }

  nextPage() {
    this.jobService.setPage(this.currentPage() + 1);
  }

  private triggerSkeleton() {
    this.skeletonActive = true;
    setTimeout(() => {
      this.skeletonActive = false;
    }, 450); // Simulate network load latency
  }
}
