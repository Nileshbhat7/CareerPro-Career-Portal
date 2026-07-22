import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Job } from '../../../models/job.model';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-card.component.html'
})
export class JobCardComponent {
  @Input({ required: true }) job!: Job;
  @Input() isBookmarked = false;
  @Output() bookmarkToggled = new EventEmitter<number>();

  onBookmarkClick() {
    this.bookmarkToggled.emit(this.job.id);
  }
}
