import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <main class="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-2xl mx-auto w-full text-center flex flex-col justify-center items-center transition-colors duration-300">
      
      <!-- 404 Visual -->
      <div class="text-9xl font-bold text-secondary/10 dark:text-gray-700/20 font-headline select-none">
        404
      </div>

      <h1 class="font-headline text-3xl font-bold text-on-surface dark:text-white mt-4 mb-2">
        Page Not Found
      </h1>
      
      <p class="font-body text-body-md text-on-surface-variant dark:text-gray-300 max-w-md mx-auto leading-relaxed mb-8">
        The page you are looking for does not exist or has been moved.
      </p>

      <!-- Action Buttons -->
      <a routerLink="/" 
         class="bg-primary dark:bg-secondary text-on-primary dark:text-white font-label-md px-8 py-3.5 rounded-xl hover:bg-surface-tint dark:hover:bg-blue-600 transition-colors active:scale-95 duration-200">
        Back to Home
      </a>

    </main>
  `
})
export class NotFoundComponent {}
