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
  template: `
    <main class="flex-grow pt-16">
      
      <!-- Hero Section -->
      <section class="relative px-6 md:px-12 py-20 max-w-7xl mx-auto min-h-[550px] flex flex-col justify-center items-center text-center overflow-hidden">
        <!-- Visual Office Pattern Overlay -->
        <div class="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03] pointer-events-none bg-cover bg-center"
             style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')">
        </div>
        
        <div class="relative z-10 max-w-4xl space-y-8">
          <h1 class="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface dark:text-white tracking-tight leading-tight">
            Find your next <span class="text-secondary dark:text-secondary-fixed">career milestone</span>
          </h1>
          <p class="font-body text-lg sm:text-xl text-on-surface-variant dark:text-gray-300 max-w-2xl mx-auto">
            Discover opportunities that align with your ambition. Join a network of high-growth professionals and top-tier companies.
          </p>

          <!-- Integrated Search bar -->
          <div class="mt-8 bg-surface-container-lowest dark:bg-[#122338] p-3 rounded-2xl shadow-[0_20px_40px_-15px_rgba(15,23,42,0.12)] border border-outline-variant/30 dark:border-gray-800 flex flex-col md:flex-row gap-3 w-full max-w-3xl mx-auto">
            <div class="flex-1 relative flex items-center bg-surface-bright dark:bg-[#0b1c30] rounded-xl border border-outline-variant/30 dark:border-gray-700 px-4 focus-within:border-secondary transition-all">
              <span class="material-symbols-outlined text-on-surface-variant dark:text-gray-400 mr-2">search</span>
              <input [(ngModel)]="searchTitle" 
                     class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md py-3 text-on-surface dark:text-white placeholder:text-on-surface-variant dark:placeholder:text-gray-500" 
                     placeholder="Job Title or Keyword" type="text" id="search-title"/>
            </div>
            
            <div class="flex-1 relative flex items-center bg-surface-bright dark:bg-[#0b1c30] rounded-xl border border-outline-variant/30 dark:border-gray-700 px-4 focus-within:border-secondary transition-all">
              <span class="material-symbols-outlined text-on-surface-variant dark:text-gray-400 mr-2">location_on</span>
              <input [(ngModel)]="searchLocation" 
                     class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md py-3 text-on-surface dark:text-white placeholder:text-on-surface-variant dark:placeholder:text-gray-500" 
                     placeholder="Location" type="text" id="search-loc"/>
            </div>
            
            <button (click)="onSearch()" 
                    class="bg-primary dark:bg-secondary text-on-primary dark:text-white font-label-md px-8 py-3.5 rounded-xl hover:bg-surface-tint dark:hover:bg-blue-600 transition-colors duration-200 w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2 active:scale-95">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <!-- Company Introduction -->
      <section class="bg-surface-container dark:bg-[#091522] px-6 md:px-12 py-16 transition-colors duration-300">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h2 class="font-headline text-3xl md:text-4xl font-bold text-on-surface dark:text-white">Innovation starts here.</h2>
          <p class="font-body text-lg text-on-surface-variant dark:text-gray-300 leading-relaxed">
            We are dedicated to connecting exceptional talent with transformative roles. Our mission is to empower professionals to reach their highest potential in environments that foster growth, precision, and impact.
          </p>
        </div>
      </section>

      <!-- Featured Jobs Grid -->
      <section class="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="font-headline text-3xl font-bold text-on-surface dark:text-white">Featured Jobs</h2>
            <p class="font-body text-body-md text-on-surface-variant dark:text-gray-400 mt-2">Explore some of our most popular open positions.</p>
          </div>
          <a routerLink="/jobs" class="text-secondary dark:text-secondary-fixed font-semibold flex items-center gap-1 hover:underline">
            View All Jobs
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let job of featuredJobs; trackBy: trackByJobId" 
               class="bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-secondary dark:hover:border-secondary-fixed transition-all duration-300 hover:shadow-lg">
            <div>
              <div class="flex justify-between items-start mb-4">
                <span class="bg-surface-container dark:bg-[#0b1c30] text-on-surface dark:text-gray-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  {{ job.type }}
                </span>
                <span class="text-xs text-on-surface-variant dark:text-gray-500">
                  {{ job.postedDate }}
                </span>
              </div>
              <h3 class="font-headline text-xl font-bold text-on-surface dark:text-white mb-1 hover:text-secondary cursor-pointer" 
                  [routerLink]="['/jobs', job.id]">
                {{ job.title }}
              </h3>
              <p class="font-body text-body-sm text-on-surface-variant dark:text-gray-400 mb-4">{{ job.company }}</p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span *ngFor="let skill of job.skills.slice(0, 3); trackBy: trackBySkill" 
                      class="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-md font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-outline-variant/10">
              <span class="text-sm font-semibold text-on-surface dark:text-white flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-gray-400">location_on</span>
                {{ job.location }}
              </span>
              <a [routerLink]="['/jobs', job.id]" 
                 class="bg-secondary-container text-white bg-blue-600 dark:bg-blue-700 text-xs px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
                Apply
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Join Us Section -->
      <section class="bg-surface-container-low dark:bg-[#08121e] px-6 md:px-12 py-20 transition-colors duration-300 border-t border-outline-variant/10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div class="space-y-6">
            <h2 class="font-headline text-3xl md:text-4xl font-bold text-on-surface dark:text-white">Why Join Our Community?</h2>
            <p class="font-body text-body-md text-on-surface-variant dark:text-gray-300">
              We connect ambitious talent with high-impact teams. We believe in providing transparency, growth potential, and support at every stage of your career journey.
            </p>
            
            <div class="grid grid-cols-2 gap-6 pt-4">
              <div class="space-y-2">
                <div class="text-4xl font-bold text-secondary dark:text-secondary-fixed">95%</div>
                <div class="font-body text-body-sm font-semibold text-on-surface dark:text-white">Candidate Satisfaction</div>
              </div>
              <div class="space-y-2">
                <div class="text-4xl font-bold text-secondary dark:text-secondary-fixed">500+</div>
                <div class="font-body text-body-sm font-semibold text-on-surface dark:text-white">Partner Companies</div>
              </div>
            </div>
          </div>

          <div class="bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-8 relative">
            <span class="material-symbols-outlined text-6xl text-secondary/10 absolute right-6 top-6 select-none">format_quote</span>
            <div class="space-y-4">
              <p class="font-body text-body-md text-on-surface dark:text-gray-200 italic leading-relaxed relative z-10">
                "Finding a job through CareerPro was incredibly smooth. The filtering options allowed me to find the perfect hybrid Angular role in Ahmedabad, and the direct application form was simple to complete."
              </p>
              <div>
                <div class="font-headline text-lg font-bold text-on-surface dark:text-white">Sarah Jenkins</div>
                <div class="font-body text-body-sm text-on-surface-variant dark:text-gray-400">Senior Angular Developer at ABC Technologies</div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  `
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

