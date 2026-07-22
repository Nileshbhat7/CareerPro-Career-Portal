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
  templateUrl: './apply.component.html'
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
