# CareerPro - Modern Career Portal

A modern, highly responsive, and clean-coded Career Portal web application built using **Angular (v21.2.0)**, **Tailwind CSS (v4.0.0)**, and **Angular Signals** for state management. The project is designed with the premium "Executive Modernist" UI aesthetics, ensuring pixel-perfect layout configurations, smooth state transitions, and light/dark theme toggles.

---

## 🛠️ Technology Stack
- **Framework**: Angular 21 (Standalone Components, Signals, Router, Reactive Forms)
- **Styling**: Tailwind CSS v4 (PostCSS, SCSS global stylesheets)
- **State Management**: Angular Signals (Computed & Writable signals)
- **Persistence**: LocalStorage (for Bookmarks, Recently Viewed, Theme choice, and Application Form drafts)

---

## 🚀 Setup & Execution Instructions

Follow these steps to run the project locally:

### 1. Prerequisite
Ensure you have **Node.js (v24.11.0+)** and **npm** installed on your system.

### 2. Install Dependencies
Run the following command in the project root to install the packages:
```bash
npm install
```

### 3. Start Development Server
Launch the local development server:
```bash
npm run start
```
Navigate to `http://localhost:4200/` in your browser.

### 4. Build for Production
To compile a production build:
```bash
npm run build
```
The compiled output will be available in the `dist/talentmicro-career-portal` directory.

---

## ✨ Features Implemented

1. **Home Page**: Includes a hero banner with integrated search (filtering by role/location on redirection), featured jobs, company introduction, testimonials, and statistics.
2. **Job Listing Page**: Supports search inputs, multi-category filters (workplace, employment type, location, experience), sorting (Latest, Oldest, Highest Salary, Lowest Experience), and pagination.
3. **Skeleton Loader**: Animations while search results render to enhance the UX.
4. **Job Details Page**: Fully detailed description, responsibilities, required skills tags, benefits, and company details.
5. **Recently Viewed Sidebar**: Displays the last 3 viewed jobs (excluding the current one) on the details page.
6. **Reactive Application Form**:
   - Fields: Name, Email, Mobile, Experience, CTC, Notice Period, Resume Upload, Cover Letter.
   - Strict validation: 10-digit mobile number, valid email, PDF/DOCX extension check, and < 2MB size limit.
   - Form Auto-Save: Saves draft progress in real-time, restoring text inputs on refresh.
7. **Bookmarks**: Saved positions persist inside LocalStorage, accessible via the navbar bookmarks route.
8. **Theme Toggle**: Real-time Light/Dark mode transitions persisting theme choices.
9. **404 Not Found Page**: Custom 404 handler for invalid routes.

---

## 💡 Assumptions
- **Mock Service**: No live backend was requested. All operations (fetching jobs, toggling bookmarks, submitting forms) are managed via an Angular Injectable service using signals and delayed RxJS observables to simulate API latency.
- **Upload File**: Because this is a frontend-only application, file uploads are validated locally and the file details (name, size, type) are displayed inside a preview card.

---

## ⚠️ Known Limitations
- The resume file object itself is not persisted in LocalStorage for draft auto-save due to browser security restrictions on file handles (only the filename and size are kept).

---

## 🔮 Future Improvements
- **Route Guards**: Implement authorization guards to secure job application forms for authenticated candidates.
- **Service Worker (PWA)**: Add PWA support for offline usage and job listing caching.
- **Unit Testing**: Implement extensive unit tests for `JobService` filters and `ApplyComponent` validations.
