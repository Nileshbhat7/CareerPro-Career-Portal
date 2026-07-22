import { Injectable, signal, computed, effect } from '@angular/core';
import { Job, JobApplication } from '../models/job.model';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  // Master Mock Jobs Data
  private allJobsList: Job[] = [
    {
      id: 1,
      title: 'Angular Developer',
      company: 'ABC Technologies',
      location: 'Ahmedabad',
      experience: '2-4 Years',
      type: 'Full Time',
      workplace: 'Hybrid',
      salary: '8-12 LPA',
      postedDate: '2026-07-20',
      skills: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'],
      description: 'We are seeking a talented Angular Developer to join our growing product team. You will build highly responsive, user-friendly frontend interfaces using Angular signals and standalone components.',
      responsibilities: [
        'Develop new user-facing features using Angular and TypeScript.',
        'Optimize application performance for maximum speed and scalability.',
        'Collaborate with UX/UI designers to translate wireframes into high-quality code.',
        'Write clean, modular, and reusable frontend components.'
      ],
      benefits: [
        'Flexible working hours & hybrid workspace.',
        'Comprehensive health insurance plans.',
        'Continuous learning and certifications sponsorship.',
        'Annual performance bonuses.'
      ],
      companyInfo: 'ABC Technologies is a leader in SaaS enterprise solutions, serving over 10 million active users globally. We emphasize innovation, craftsmanship, and developer empowerment.'
    },
    {
      id: 2,
      title: 'Senior Frontend Architect',
      company: 'TalentMicro Solutions',
      location: 'Bangalore',
      experience: '5-8 Years',
      type: 'Full Time',
      workplace: 'Office',
      salary: '18-24 LPA',
      postedDate: '2026-07-18',
      skills: ['Angular', 'RxJS', 'TypeScript', 'NgRx', 'Micro-Frontends'],
      description: 'Lead the frontend architecture of our next-generation cloud platforms. You will establish coding standards, guide development teams, and design highly scalable, performance-driven web architectures.',
      responsibilities: [
        'Define architecture guidelines and design patterns for Angular applications.',
        'Mentor junior and mid-level frontend engineers.',
        'Conduct code reviews and champion clean code standards.',
        'Collaborate with cloud architects to streamline frontend deployment pipelines.'
      ],
      benefits: [
        'Competitive stock options (ESOPs).',
        'Top-tier medical coverage for family.',
        'Home office setup allowance.',
        'Paid parental and study leave.'
      ],
      companyInfo: 'TalentMicro Solutions is a global consulting and digital transformation firm specialized in building high-performance engineering teams for startups and enterprises alike.'
    },
    {
      id: 3,
      title: 'Junior UI Engineer (Fresher)',
      company: 'Innovate Labs',
      location: 'Pune',
      experience: 'Fresher',
      type: 'Full Time',
      workplace: 'Remote',
      salary: '4-6 LPA',
      postedDate: '2026-07-21',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'Tailwind CSS'],
      description: 'Start your professional journey with us! We are looking for passionate freshers who want to build amazing web applications. You will receive extensive mentoring and work on live, high-impact projects.',
      responsibilities: [
        'Assist in building and styling UI layouts using HTML, SCSS, and Tailwind.',
        'Implement interactive client-side logic using Angular components.',
        'Fix bugs and refine user interfaces based on feedback.',
        'Participate in daily standups and sprint planning meetings.'
      ],
      benefits: [
        'Intensive 3-month onboarding and training boot camp.',
        'Monthly wellness and fitness stipend.',
        'Modern development machine (MacBook Pro).',
        'Energetic work culture with team outings.'
      ],
      companyInfo: 'Innovate Labs incubator focuses on early-stage tech disruptions, creating cutting-edge prototypes and digital products for emerging market segments.'
    },
    {
      id: 4,
      title: 'Lead React Developer',
      company: 'CloudStream Systems',
      location: 'Hyderabad',
      experience: '5-8 Years',
      type: 'Full Time',
      workplace: 'Remote',
      salary: '20-26 LPA',
      postedDate: '2026-07-15',
      skills: ['React', 'Next.js', 'Redux Toolkit', 'TypeScript', 'Tailwind'],
      description: 'We are hiring a Lead React Developer to direct the engineering of our streaming dashboards. Experience with Next.js and high-frequency real-time web socket feeds is highly preferred.',
      responsibilities: [
        'Develop real-time dashboard visualization platforms.',
        'Manage and optimize frontend application states effectively.',
        'Ensure sub-second page rendering and minimize bundle sizes.',
        'Interface with backend streaming teams using WebSockets and gRPC.'
      ],
      benefits: [
        'Fully remote working model with flexible schedules.',
        'Annual tech conference sponsorships.',
        'Wellness and mental health support plans.',
        'Generous annual leave and wellness days.'
      ],
      companyInfo: 'CloudStream Systems designs cloud-native data streaming services for finance, logistics, and live entertainment industries globally.'
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      company: 'Nexus Fintech',
      location: 'Mumbai',
      experience: '2-4 Years',
      type: 'Contract',
      workplace: 'Hybrid',
      salary: '10-15 LPA',
      postedDate: '2026-07-10',
      skills: ['Angular', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
      description: 'Join our fintech engineering division. Build secure, robust, and highly reliable transaction-oriented web applications and APIs.',
      responsibilities: [
        'Design and deploy scalable web portals and backend APIs.',
        'Ensure security practices (OAuth, CSRF protection, data masking) are integrated.',
        'Integrate payment gateways and transaction history modules.',
        'Participate in rigorous automated unit and integration testing.'
      ],
      benefits: [
        'Performance-linked project bonuses.',
        'Subsidized healthy meals and gym memberships.',
        'Health insurance + dental checkups coverage.',
        'Clear career progression pathways.'
      ],
      companyInfo: 'Nexus Fintech is an fast-growing financial service partner facilitating digital lending and micro-transactions for millions of underbanked consumers.'
    },
    {
      id: 6,
      title: 'UX/UI Developer',
      company: 'Creative Labs',
      location: 'Ahmedabad',
      experience: '2-4 Years',
      type: 'Part Time',
      workplace: 'Office',
      salary: '5-8 LPA',
      postedDate: '2026-07-12',
      skills: ['Figma', 'HTML', 'CSS', 'Tailwind CSS', 'Angular Basics'],
      description: 'Are you a designer who loves to write code, or a coder with an eye for design? Join us in crafting beautiful, accessible interfaces for e-commerce and retail brands.',
      responsibilities: [
        'Create interactive prototypes in Figma and translate them into responsive code.',
        'Implement accessibility (WCAG 2.1 AA compliance) across web assets.',
        'Design custom illustrations, icons, and micro-animations.',
        'Conduct A/B testing and analyze user interaction data.'
      ],
      benefits: [
        'Flexible hours ideal for balancing design studies or freelance projects.',
        'Access to creative learning resources and training platforms.',
        'Modern creative workspace.',
        'Regular designer-developer meetups.'
      ],
      companyInfo: 'Creative Labs is a premium design and development agency specializing in brand building, custom graphics, and immersive web user experiences.'
    }
  ];

  // Master Predefined Lists for UI and Casing Normalization
  readonly locationsList = ['Ahmedabad', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai'];
  readonly experiencesList = ['Fresher', '2-4 Years', '5-8 Years'];
  readonly jobTypesList = ['Full Time', 'Part Time', 'Contract'];
  readonly workplacesList = ['Remote', 'Hybrid', 'Office'];

  // State Signals
  readonly searchQuery = signal<string>('');
  readonly selectedLocations = signal<string[]>([]);
  readonly selectedExperiences = signal<string[]>([]);
  readonly selectedTypes = signal<string[]>([]);
  readonly selectedWorkplaces = signal<string[]>([]);
  readonly sortBy = signal<string>('latest');
  
  readonly currentPage = signal<number>(1);
  readonly pageSize = signal<number>(3); // Keep page size small to demonstrate pagination easily

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  // Bookmarks and Recently Viewed (initialized from localStorage)
  readonly bookmarkedIds = signal<number[]>(this.loadBookmarks());
  readonly recentlyViewedIds = signal<number[]>(this.loadRecentlyViewed());

  constructor() {
    // Effects to sync state with localStorage
    effect(() => {
      localStorage.setItem('bookmarked_jobs', JSON.stringify(this.bookmarkedIds()));
    });
    effect(() => {
      localStorage.setItem('recently_viewed_jobs', JSON.stringify(this.recentlyViewedIds()));
    });
  }

  // List of all jobs
  readonly jobs = signal<Job[]>(this.allJobsList);

  // Filtered jobs
  readonly filteredJobs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const locations = this.selectedLocations();
    const experiences = this.selectedExperiences();
    const types = this.selectedTypes();
    const workplaces = this.selectedWorkplaces();
    let result = this.jobs();

    // 1. Search filter (checks title, company, location, skills, and description)
    if (query) {
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.skills.some(skill => skill.toLowerCase().includes(query)) ||
        job.description.toLowerCase().includes(query)
      );
    }

    // 2. Location filter (case-insensitive)
    if (locations.length > 0) {
      const lowerLocations = locations.map(l => l.toLowerCase());
      result = result.filter(job => lowerLocations.includes(job.location.toLowerCase()));
    }

    // 3. Experience filter (case-insensitive)
    if (experiences.length > 0) {
      const lowerExperiences = experiences.map(e => e.toLowerCase());
      result = result.filter(job => lowerExperiences.includes(job.experience.toLowerCase()));
    }

    // 4. Job Type filter (case-insensitive)
    if (types.length > 0) {
      const lowerTypes = types.map(t => t.toLowerCase());
      result = result.filter(job => lowerTypes.includes(job.type.toLowerCase()));
    }

    // 5. Workplace filter (case-insensitive)
    if (workplaces.length > 0) {
      const lowerWorkplaces = workplaces.map(w => w.toLowerCase());
      result = result.filter(job => lowerWorkplaces.includes(job.workplace.toLowerCase()));
    }

    return result;
  });

  // Sorted Jobs
  readonly sortedJobs = computed(() => {
    const jobsList = [...this.filteredJobs()];
    const sort = this.sortBy();

    switch (sort) {
      case 'oldest':
        return jobsList.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
      
      case 'salary-high':
        return jobsList.sort((a, b) => {
          const salA = this.parseSalary(a.salary);
          const salB = this.parseSalary(b.salary);
          return salB - salA;
        });

      case 'experience-asc':
        return jobsList.sort((a, b) => {
          const expA = this.parseExperience(a.experience);
          const expB = this.parseExperience(b.experience);
          return expA - expB;
        });

      case 'latest':
      default:
        return jobsList.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }
  });

  // Paginated Jobs
  readonly paginatedJobs = computed(() => {
    const list = this.sortedJobs();
    const pageIndex = this.currentPage() - 1;
    const size = this.pageSize();
    return list.slice(pageIndex * size, (pageIndex + 1) * size);
  });

  // Total pages
  readonly totalPages = computed(() => {
    const totalItems = this.sortedJobs().length;
    return Math.ceil(totalItems / this.pageSize()) || 1;
  });

  // Actions
  setSearch(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1); // Reset page to 1 on filter
  }

  toggleFilter(category: 'location' | 'experience' | 'type' | 'workplace', value: string) {
    this.currentPage.set(1);
    let normalizedValue = value;

    switch (category) {
      case 'location': {
        const found = this.locationsList.find(l => l.toLowerCase() === value.toLowerCase());
        if (found) normalizedValue = found;
        this.selectedLocations.update(list => list.includes(normalizedValue) ? list.filter(v => v !== normalizedValue) : [...list, normalizedValue]);
        break;
      }
      case 'experience': {
        const found = this.experiencesList.find(e => e.toLowerCase() === value.toLowerCase());
        if (found) normalizedValue = found;
        this.selectedExperiences.update(list => list.includes(normalizedValue) ? list.filter(v => v !== normalizedValue) : [...list, normalizedValue]);
        break;
      }
      case 'type': {
        const found = this.jobTypesList.find(t => t.toLowerCase() === value.toLowerCase());
        if (found) normalizedValue = found;
        this.selectedTypes.update(list => list.includes(normalizedValue) ? list.filter(v => v !== normalizedValue) : [...list, normalizedValue]);
        break;
      }
      case 'workplace': {
        const found = this.workplacesList.find(w => w.toLowerCase() === value.toLowerCase());
        if (found) normalizedValue = found;
        this.selectedWorkplaces.update(list => list.includes(normalizedValue) ? list.filter(v => v !== normalizedValue) : [...list, normalizedValue]);
        break;
      }
    }
  }

  setFiltersFromSearch(title: string, location: string) {
    this.resetFilters();
    if (title) {
      this.searchQuery.set(title);
    }
    if (location) {
      const found = this.locationsList.find(l => l.toLowerCase() === location.toLowerCase());
      const valToAdd = found || location;
      this.selectedLocations.set([valToAdd]);
    }
    this.currentPage.set(1);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedLocations.set([]);
    this.selectedExperiences.set([]);
    this.selectedTypes.set([]);
    this.selectedWorkplaces.set([]);
    this.sortBy.set('latest');
    this.currentPage.set(1);
  }

  setSort(sort: string) {
    this.sortBy.set(sort);
    this.currentPage.set(1);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  // Get job by ID
  getJobById(id: number): Job | undefined {
    return this.jobs().find(job => job.id === id);
  }

  // Bookmarking
  toggleBookmark(jobId: number) {
    this.bookmarkedIds.update(ids => 
      ids.includes(jobId) ? ids.filter(id => id !== jobId) : [...ids, jobId]
    );
  }

  isBookmarked(jobId: number): boolean {
    return this.bookmarkedIds().includes(jobId);
  }

  // Recently Viewed
  markAsViewed(jobId: number) {
    this.recentlyViewedIds.update(ids => {
      // Remove if already exists and add to the beginning
      const filtered = ids.filter(id => id !== jobId);
      return [jobId, ...filtered].slice(0, 5); // Store last 5 viewed jobs
    });
  }

  // Submission endpoint mock
  submitApplication(app: JobApplication) {
    // Return observable with delay to simulate API latency
    this.isLoading.set(true);
    return of({ success: true, message: 'Application submitted successfully' }).pipe(
      delay(1500)
    );
  }

  // Helpers
  private loadBookmarks(): number[] {
    const val = localStorage.getItem('bookmarked_jobs');
    return val ? JSON.parse(val) : [];
  }

  private loadRecentlyViewed(): number[] {
    const val = localStorage.getItem('recently_viewed_jobs');
    return val ? JSON.parse(val) : [];
  }

  private parseSalary(salary?: string): number {
    if (!salary) return 0;
    // Extract numbers, e.g. "8-12 LPA" -> 12
    const matches = salary.match(/\d+/g);
    if (!matches) return 0;
    return Math.max(...matches.map(Number));
  }

  private parseExperience(exp: string): number {
    if (exp.toLowerCase().includes('fresher')) return 0;
    const matches = exp.match(/\d+/);
    return matches ? Number(matches[0]) : 0;
  }
}
