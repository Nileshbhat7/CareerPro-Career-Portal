import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full transition-colors duration-300">
      
      <!-- Back button -->
      <button (click)="goBack()" 
              class="flex items-center gap-1.5 text-body-sm font-semibold text-on-surface-variant dark:text-gray-400 hover:text-secondary dark:hover:text-white mb-6 active:scale-95 transition-all">
        <span class="material-symbols-outlined text-sm">arrow_back</span>
        Back to Jobs
      </button>

      <!-- Main Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8" *ngIf="job">
        
        <!-- Details Content -->
        <article class="lg:col-span-8 space-y-8 bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-6 md:p-8">
          
          <!-- Job Header Info -->
          <div class="space-y-4 pb-6 border-b border-outline-variant/10">
            <div class="flex justify-between items-start gap-4">
              <div>
                <h1 class="font-headline text-3xl font-bold text-on-surface dark:text-white">{{ job.title }}</h1>
                <p class="font-body text-lg text-secondary dark:text-secondary-fixed font-semibold mt-1">{{ job.company }}</p>
              </div>
              
              <!-- Bookmark -->
              <button (click)="toggleBookmark()"
                      class="p-2.5 rounded-xl border border-outline-variant/30 dark:border-gray-700 text-on-surface-variant hover:bg-surface-container dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200">
                <span class="material-symbols-outlined" 
                      [class.text-amber-500]="isBookmarked" 
                      [class.fill-1]="isBookmarked">
                  star
                </span>
              </button>
            </div>

            <!-- Stats/Tags Row -->
            <div class="flex flex-wrap items-center gap-4 text-xs font-body text-on-surface-variant dark:text-gray-400">
              <span class="flex items-center gap-1.5 bg-surface-container dark:bg-[#0b1c30] px-3 py-1.5 rounded-full font-medium">
                <span class="material-symbols-outlined text-sm">location_on</span>
                {{ job.location }}
              </span>
              <span class="flex items-center gap-1.5 bg-surface-container dark:bg-[#0b1c30] px-3 py-1.5 rounded-full font-medium">
                <span class="material-symbols-outlined text-sm">work</span>
                {{ job.type }} ({{ job.workplace }})
              </span>
              <span class="flex items-center gap-1.5 bg-surface-container dark:bg-[#0b1c30] px-3 py-1.5 rounded-full font-medium">
                <span class="material-symbols-outlined text-sm">business_center</span>
                {{ job.experience }}
              </span>
              <span *ngIf="job.salary" class="flex items-center gap-1.5 bg-surface-container dark:bg-[#0b1c30] px-3 py-1.5 rounded-full font-medium">
                <span class="material-symbols-outlined text-sm">payments</span>
                {{ job.salary }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div class="space-y-3">
            <h2 class="font-headline text-xl font-bold text-on-surface dark:text-white">Role Overview</h2>
            <p class="font-body text-body-md text-on-surface-variant dark:text-gray-300 leading-relaxed">
              {{ job.description }}
            </p>
          </div>

          <!-- Responsibilities -->
          <div class="space-y-3">
            <h2 class="font-headline text-xl font-bold text-on-surface dark:text-white">Key Responsibilities</h2>
            <ul class="list-disc pl-5 space-y-2 font-body text-body-md text-on-surface-variant dark:text-gray-300">
              <li *ngFor="let resp of job.responsibilities">{{ resp }}</li>
            </ul>
          </div>

          <!-- Skills tags -->
          <div class="space-y-3">
            <h2 class="font-headline text-xl font-bold text-on-surface dark:text-white">Skills Required</h2>
            <div class="flex flex-wrap gap-2.5">
              <span *ngFor="let skill of job.skills" 
                    class="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-sm px-3.5 py-1.5 rounded-lg font-medium">
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Benefits -->
          <div class="space-y-3">
            <h2 class="font-headline text-xl font-bold text-on-surface dark:text-white">Benefits & Perks</h2>
            <ul class="list-disc pl-5 space-y-2 font-body text-body-md text-on-surface-variant dark:text-gray-300">
              <li *ngFor="let benefit of job.benefits">{{ benefit }}</li>
            </ul>
          </div>

          <!-- Company Info -->
          <div class="space-y-3 pt-6 border-t border-outline-variant/10">
            <h2 class="font-headline text-xl font-bold text-on-surface dark:text-white">About {{ job.company }}</h2>
            <p class="font-body text-body-md text-on-surface-variant dark:text-gray-300 leading-relaxed">
              {{ job.companyInfo }}
            </p>
          </div>

        </article>

        <!-- Sidebar Actions & Recently Viewed -->
        <aside class="lg:col-span-4 space-y-6">
          
          <!-- Apply CTA box -->
          <div class="bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-6 space-y-4 text-center">
            <h2 class="font-headline text-lg font-bold text-on-surface dark:text-white">Interested in this role?</h2>
            <p class="font-body text-body-sm text-on-surface-variant dark:text-gray-400">
              Submit your resume and details to apply directly. It takes less than 2 minutes.
            </p>
            <a [routerLink]="['/apply', job.id]" 
               class="block bg-primary dark:bg-secondary text-on-primary dark:text-white font-label-md py-3.5 rounded-xl hover:bg-surface-tint dark:hover:bg-blue-600 transition-colors duration-200 text-center font-semibold active:scale-95">
              Apply Now
            </a>
          </div>

          <!-- Recently Viewed sidebar -->
          <div class="bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-6 space-y-4" 
               *ngIf="recentlyViewedJobs.length > 0">
            <h2 class="font-headline text-md font-bold text-on-surface dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary">history</span>
              Recently Viewed
            </h2>
            <div class="divide-y divide-outline-variant/10">
              <div *ngFor="let item of recentlyViewedJobs" class="py-3 first:pt-0 last:pb-0 space-y-1">
                <a [routerLink]="['/jobs', item.id]" 
                   class="font-headline text-body-sm font-bold text-on-surface dark:text-white hover:text-secondary dark:hover:text-secondary-fixed transition-colors block">
                  {{ item.title }}
                </a>
                <div class="flex justify-between items-center text-xs text-on-surface-variant dark:text-gray-400">
                  <span>{{ item.company }}</span>
                  <span>{{ item.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </main>
  `
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
