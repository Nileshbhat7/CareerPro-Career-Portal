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
    <main class="flex-grow pt-16 bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50 dark:from-blue-950/20 dark:via-[#0f172a] dark:to-[#0f172a] transition-colors duration-300">
      
      <!-- Hero Section -->
      <section class="relative px-6 md:px-12 py-20 max-w-7xl mx-auto min-h-[550px] flex flex-col justify-center items-center text-center overflow-hidden">
        <!-- Visual Office Pattern Overlay -->
        <div class="absolute inset-0 z-0 opacity-5 dark:opacity-[0.02] pointer-events-none bg-cover bg-center"
             style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')">
        </div>
        
        <div class="relative z-10 max-w-4xl space-y-8">
          <h1 class="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Find your next <span class="text-blue-600 dark:text-blue-400">career milestone</span>
          </h1>
          <p class="font-body text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover opportunities that align with your ambition. Join a network of high-growth professionals and top-tier companies.
          </p>

          <!-- Integrated Search bar -->
          <div class="mt-8 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-3 w-full max-w-3xl mx-auto">
            <div class="flex-1 relative flex items-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all">
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 mr-2">search</span>
              <input [(ngModel)]="searchTitle" 
                     class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                     placeholder="Job Title or Keyword" type="text" id="search-title"/>
            </div>
            
            <div class="flex-1 relative flex items-center bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all">
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 mr-2">location_on</span>
              <input [(ngModel)]="searchLocation" 
                     class="w-full bg-transparent border-none focus:ring-0 font-body text-body-md py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" 
                     placeholder="Location" type="text" id="search-loc"/>
            </div>
            
            <button (click)="onSearch()" 
                    class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-label-md px-8 py-3.5 rounded-xl transition-all duration-200 w-full md:w-auto flex-shrink-0 flex items-center justify-center gap-2 active:scale-95 shadow-md hover:shadow-lg">
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      <!-- Company Introduction -->
      <section class="bg-slate-100/80 dark:bg-slate-900/60 backdrop-blur-sm px-6 md:px-12 py-16 transition-colors duration-300 border-y border-slate-200/50 dark:border-slate-800/50">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <h2 class="font-headline text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Innovation starts here.</h2>
          <p class="font-body text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            We are dedicated to connecting exceptional talent with transformative roles. Our mission is to empower professionals to reach their highest potential in environments that foster growth, precision, and impact.
          </p>
        </div>
      </section>

      <!-- Featured Jobs Grid -->
      <section class="px-6 md:px-12 py-20 max-w-7xl mx-auto">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="font-headline text-3xl font-bold text-slate-900 dark:text-white">Featured Jobs</h2>
            <p class="font-body text-body-md text-slate-500 dark:text-slate-400 mt-2">Explore some of our most popular open positions.</p>
          </div>
          <a routerLink="/jobs" class="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 hover:underline group">
            View All Jobs
            <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div *ngFor="let job of featuredJobs; trackBy: trackByJobId" 
               class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors"></div>
            <div>
              <div class="flex justify-between items-start mb-4">
                <span class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  {{ job.type }}
                </span>
                <span class="text-xs text-slate-400 dark:text-slate-500">
                  {{ job.postedDate }}
                </span>
              </div>
              <h3 class="font-headline text-xl font-bold text-slate-900 dark:text-white mb-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" 
                  [routerLink]="['/jobs', job.id]">
                {{ job.title }}
              </h3>
              <p class="font-body text-body-sm text-slate-500 dark:text-slate-400 mb-4">{{ job.company }}</p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <span *ngFor="let skill of job.skills.slice(0, 3); trackBy: trackBySkill" 
                      class="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs px-2.5 py-1 rounded-md font-medium">
                  {{ skill }}
                </span>
              </div>
            </div>

            <div class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800/50">
              <span class="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <span class="material-symbols-outlined text-sm text-slate-400 dark:text-slate-500">location_on</span>
                {{ job.location }}
              </span>
              <a [routerLink]="['/jobs', job.id]" 
                 class="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
                Apply
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Join Us Section -->
      <section class="bg-slate-100/50 dark:bg-slate-950/20 px-6 md:px-12 py-20 transition-colors duration-300 border-t border-slate-200/50 dark:border-slate-800/50">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div class="space-y-6">
            <h2 class="font-headline text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Why Join Our Community?</h2>
            <p class="font-body text-body-md text-slate-600 dark:text-slate-300">
              We connect ambitious talent with high-impact teams. We believe in providing transparency, growth potential, and support at every stage of your career journey.
            </p>
            
            <div class="grid grid-cols-2 gap-6 pt-4">
              <div class="space-y-2">
                <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">95%</div>
                <div class="font-body text-body-sm font-semibold text-slate-700 dark:text-slate-200">Candidate Satisfaction</div>
              </div>
              <div class="space-y-2">
                <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">500+</div>
                <div class="font-body text-body-sm font-semibold text-slate-700 dark:text-slate-200">Partner Companies</div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 relative shadow-lg">
            <span class="material-symbols-outlined text-6xl text-blue-600/10 absolute right-6 top-6 select-none pointer-events-none">format_quote</span>
            <div class="space-y-4">
              <p class="font-body text-body-md text-slate-700 dark:text-slate-200 italic leading-relaxed relative z-10">
                "Finding a job through CareerPro was incredibly smooth. The filtering options allowed me to find the perfect hybrid Angular role in Ahmedabad, and the direct application form was simple to complete."
              </p>
              <div>
                <div class="font-headline text-lg font-bold text-slate-900 dark:text-white">Sarah Jenkins</div>
                <div class="font-body text-body-sm text-slate-500 dark:text-slate-400">Senior Angular Developer at ABC Technologies</div>
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
