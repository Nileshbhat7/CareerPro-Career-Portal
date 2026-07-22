import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main class="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto w-full transition-colors duration-300">
      
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="font-headline text-3xl font-bold text-on-surface dark:text-white">Apply for Position</h1>
          <p class="font-body text-body-md text-on-surface-variant dark:text-gray-400 mt-2" *ngIf="job">
            {{ job.title }} at <span class="text-secondary dark:text-secondary-fixed font-semibold">{{ job.company }}</span>
          </p>
        </div>
        <button (click)="goBack()" class="text-body-sm font-semibold text-on-surface-variant dark:text-gray-400 hover:text-secondary dark:hover:text-white flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">close</span>
          Cancel
        </button>
      </div>

      <!-- Main Form Card -->
      <div class="bg-surface-container-lowest dark:bg-[#122338] border border-outline-variant/30 dark:border-gray-800 rounded-2xl p-6 md:p-8">
        
        <form [formGroup]="applyForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <!-- Name Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="first-name" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">First Name *</label>
              <input id="first-name" type="text" formControlName="firstName" 
                     [class.border-red-500]="isInvalid('firstName')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="John"/>
              <div *ngIf="isInvalid('firstName')" class="text-red-500 text-xs font-semibold">
                First Name is required (min 2 characters).
              </div>
            </div>

            <div class="space-y-2">
              <label for="last-name" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Last Name *</label>
              <input id="last-name" type="text" formControlName="lastName"
                     [class.border-red-500]="isInvalid('lastName')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="Doe"/>
              <div *ngIf="isInvalid('lastName')" class="text-red-500 text-xs font-semibold">
                Last Name is required.
              </div>
            </div>
          </div>

          <!-- Contact Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="email" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Email Address *</label>
              <input id="email" type="email" formControlName="email"
                     [class.border-red-500]="isInvalid('email')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="john.doe&#64;example.com"/>
              <div *ngIf="isInvalid('email')" class="text-red-500 text-xs font-semibold">
                Please enter a valid email address.
              </div>
            </div>

            <div class="space-y-2">
              <label for="mobile" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Mobile Number *</label>
              <input id="mobile" type="tel" formControlName="mobile"
                     [class.border-red-500]="isInvalid('mobile')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="e.g. 9876543210"/>
              <div *ngIf="isInvalid('mobile')" class="text-red-500 text-xs font-semibold">
                Please enter a valid 10-digit mobile number.
              </div>
            </div>
          </div>

          <!-- Experience & Notice Period -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label for="experience" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Years of Experience *</label>
              <input id="experience" type="number" formControlName="experience"
                     [class.border-red-500]="isInvalid('experience')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="0" min="0"/>
              <div *ngIf="isInvalid('experience')" class="text-red-500 text-xs font-semibold">
                Experience must be 0 or more.
              </div>
            </div>

            <div class="space-y-2">
              <label for="notice-period" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Notice Period *</label>
              <select id="notice-period" formControlName="noticePeriod"
                      [class.border-red-500]="isInvalid('noticePeriod')"
                      class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all cursor-pointer">
                <option value="">Select Notice Period</option>
                <option value="Immediate">Immediate</option>
                <option value="15 Days">15 Days</option>
                <option value="30 Days">30 Days</option>
                <option value="60 Days">60 Days</option>
                <option value="90 Days">90 Days</option>
              </select>
              <div *ngIf="isInvalid('noticePeriod')" class="text-red-500 text-xs font-semibold">
                Notice Period is required.
              </div>
            </div>

            <div class="space-y-2">
              <label for="current-company" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Current Company</label>
              <input id="current-company" type="text" formControlName="currentCompany"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="e.g. Acme Corp"/>
            </div>
          </div>

          <!-- CTC Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label for="current-ctc" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Current CTC (LPA)</label>
              <input id="current-ctc" type="text" formControlName="currentCtc"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="e.g. 6.5 LPA"/>
            </div>

            <div class="space-y-2">
              <label for="expected-ctc" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Expected CTC (LPA) *</label>
              <input id="expected-ctc" type="text" formControlName="expectedCtc"
                     [class.border-red-500]="isInvalid('expectedCtc')"
                     class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all"
                     placeholder="e.g. 9.5 LPA"/>
              <div *ngIf="isInvalid('expectedCtc')" class="text-red-500 text-xs font-semibold">
                Expected CTC is required.
              </div>
            </div>
          </div>

          <!-- Resume Upload -->
          <div class="space-y-2">
            <span class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300 block">Resume Upload (PDF/Docx, Max 2MB) *</span>
            
            <div class="border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer relative"
                 [class.border-red-500]="resumeError || (applyForm.get('resumeName')?.touched && applyForm.get('resumeName')?.invalid)"
                 [class.border-secondary]="fileName"
                 [class.border-outline-variant/50]="!fileName && !resumeError"
                 [class.bg-blue-50/10]="fileName"
                 (click)="fileInput.click()">
              
              <input #fileInput type="file" (change)="onFileSelected($event)" accept=".pdf,.docx" class="hidden"/>
              
              <div class="space-y-2" *ngIf="!fileName">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/60 dark:text-gray-400">cloud_upload</span>
                <p class="font-body text-body-sm text-on-surface dark:text-white">
                  <span class="text-secondary dark:text-secondary-fixed font-bold hover:underline">Click to upload</span> or drag and drop
                </p>
                <p class="text-xs text-on-surface-variant dark:text-gray-500">PDF, DOCX up to 2MB</p>
              </div>

              <!-- Uploaded file preview -->
              <div class="flex items-center justify-between bg-surface-container dark:bg-[#0b1c30] p-3 rounded-xl max-w-md mx-auto" *ngIf="fileName" (click)="$event.stopPropagation()">
                <div class="flex items-center gap-3 text-left">
                  <span class="material-symbols-outlined text-3xl text-secondary">description</span>
                  <div class="overflow-hidden">
                    <p class="text-body-sm font-bold text-on-surface dark:text-white truncate max-w-[200px]">{{ fileName }}</p>
                    <p class="text-xs text-on-surface-variant dark:text-gray-400">{{ fileSizeFormatted }}</p>
                  </div>
                </div>
                <button type="button" (click)="clearFile()" class="p-1 rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-red-500">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            <!-- Error message for resume -->
            <div *ngIf="resumeError" class="text-red-500 text-xs font-semibold mt-1">
              {{ resumeError }}
            </div>
            <div *ngIf="!resumeError && applyForm.get('resumeName')?.touched && applyForm.get('resumeName')?.invalid" class="text-red-500 text-xs font-semibold mt-1">
              Please upload a resume.
            </div>
          </div>

          <!-- Cover Letter -->
          <div class="space-y-2">
            <label for="cover-letter" class="font-body text-body-sm font-bold text-on-surface dark:text-gray-300">Cover Letter</label>
            <textarea id="cover-letter" formControlName="coverLetter" rows="4" maxlength="500"
                      class="w-full rounded-xl border border-outline-variant/50 dark:border-gray-700 bg-surface-bright dark:bg-[#0b1c30] text-on-surface dark:text-white py-3 px-4 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all resize-none"
                      placeholder="Explain why you are a great fit for this position..."></textarea>
            <div class="text-right text-xs text-on-surface-variant dark:text-gray-500">
              {{ applyForm.get('coverLetter')?.value?.length || 0 }}/500 characters
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4 justify-end pt-4 border-t border-outline-variant/10">
            <button type="button" (click)="goBack()" 
                    class="font-label-md text-on-surface-variant dark:text-gray-300 px-6 py-3.5 hover:bg-surface-container rounded-xl transition-all duration-200 active:scale-95">
              Cancel
            </button>
            
            <button type="submit" 
                    [disabled]="applyForm.invalid || isSubmitting"
                    class="bg-primary dark:bg-secondary text-on-primary dark:text-white font-label-md px-8 py-3.5 rounded-xl hover:bg-surface-tint dark:hover:bg-blue-600 disabled:opacity-45 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 justify-center min-w-[140px] active:scale-95">
              <!-- Loading spinner -->
              <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>

        </form>
      </div>

    </main>
  `
})
export class ApplyComponent implements OnInit {
  job?: Job;
  applyForm!: FormGroup;
  isSubmitting = false;
  fileName = '';
  fileSizeFormatted = '';
  resumeError = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      if (idStr) {
        const jobId = Number(idStr);
        const fetchedJob = this.jobService.getJobById(jobId);
        
        if (fetchedJob) {
          this.job = fetchedJob;
          this.applyForm.patchValue({ jobId: jobId });
        } else {
          this.router.navigate(['/404'], { skipLocationChange: true });
        }
      }
    });

    // Auto-save form draft details: load from local storage
    const savedDraft = localStorage.getItem('apply_form_draft');
    if (savedDraft) {
      try {
        const data = JSON.parse(savedDraft);
        // Do not overwrite jobId loaded from URL path
        const currentJobId = this.applyForm.value.jobId;
        this.applyForm.patchValue({
          ...data,
          jobId: currentJobId
        });
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }

    // Subscribe to changes and write to localStorage
    this.applyForm.valueChanges.subscribe(value => {
      const { jobId, resumeName, ...draft } = value;
      localStorage.setItem('apply_form_draft', JSON.stringify(draft));
    });
  }

  createForm() {
    this.applyForm = this.fb.group({
      jobId: [null, Validators.required],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      experience: [0, [Validators.required, Validators.min(0)]],
      currentCompany: [''],
      currentCtc: [''],
      expectedCtc: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      resumeName: ['', Validators.required], // Store filename for validation
      coverLetter: ['', Validators.maxLength(500)]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.applyForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (file) {
      this.resumeError = '';
      
      // 1. File type validation (.pdf or .docx)
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (!allowedTypes.includes(file.type) && extension !== 'pdf' && extension !== 'docx') {
        this.resumeError = 'Only PDF and DOCX files are allowed.';
        this.clearFile();
        return;
      }

      // 2. File size validation (Max 2MB = 2,097,152 bytes)
      const maxSizeBytes = 2 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        this.resumeError = 'File size must be less than 2MB.';
        this.clearFile();
        return;
      }

      // Successful selection
      this.fileName = file.name;
      this.fileSizeFormatted = this.formatBytes(file.size);
      this.applyForm.patchValue({ resumeName: file.name });
      this.applyForm.get('resumeName')?.markAsDirty();
    }
  }

  clearFile() {
    this.fileName = '';
    this.fileSizeFormatted = '';
    this.applyForm.patchValue({ resumeName: '' });
  }

  formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  onSubmit() {
    if (this.applyForm.valid) {
      this.isSubmitting = true;
      const applicationData = this.applyForm.value;

      this.jobService.submitApplication(applicationData).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          // Clear draft from localStorage upon success
          localStorage.removeItem('apply_form_draft');
          // Navigate to thank you page
          this.router.navigate(['/thank-you'], {
            queryParams: {
              job: this.job?.title,
              company: this.job?.company
            }
          });
        },
        error: (err) => {
          this.isSubmitting = false;
          alert('Submission failed. Please try again.');
        }
      });
    } else {
      // Mark all fields as touched to trigger validation visuals
      this.applyForm.markAllAsTouched();
    }
  }

  goBack() {
    window.history.back();
  }
}
