# CareerPro - Modern Career Portal

CareerPro is a responsive career portal built with Angular and Tailwind CSS where candidates can search, filter, view, bookmark, and apply for jobs.

---

## 📋 Project Overview

The project provides a complete job search and application interface for candidates. It is designed to be performant, modular, and easy to maintain by leveraging standard Angular features like standalone components, reactive forms, and signals for state management.

---

## 🛠️ Technology Stack

- **Framework**: Angular 21 (utilizing Standalone Components, Angular Signals, Angular Router, and Reactive Forms)
- **Styling**: Tailwind CSS (PostCSS integration with SCSS global stylesheets)
- **State Management**: Angular Signals (Computed and Writable signals for filters, pagination, and bookmarks)
- **Asynchronous Data**: RxJS (handling routing query parameter streams and simulated API response latency)
- **Persistence**: LocalStorage (persisting user bookmarks, recently viewed jobs history, dark mode preference, and draft application form data)

---

## 🚀 Setup Instructions

Follow these steps to run the project locally:

### 1. Prerequisites
Ensure you have **Node.js** and **npm** installed on your system.

### 2. Install Dependencies
Run the following command in the project root directory:
```bash
npm install
```

### 3. Start Development Server
Launch the local development server:
```bash
npm start
```
Open your browser and navigate to `http://localhost:4200/`.

### 4. Build for Production
To compile the production build:
```bash
npm run build
```
The compiled output will be available in the `dist/talentmicro-career-portal` directory.

---

## ✨ Features Implemented

1. **Home Page**: Places the Quick Job Search form side-by-side with a listing of handpicked Featured Jobs, along with core value propositions and testimonials.
2. **Job Search**: Users can search positions by job title, company, or keywords using the search form.
3. **Job Listing**:
   - Displays all open positions with pagination.
   - Supports sorting by Latest, Oldest, Highest Salary, and Lowest Experience.
4. **Filters**: Sidebar allows filtering jobs by Workplace Mode, Employment Type, Location, and Experience.
5. **Job Details Page**: Displays complete job information including description, responsibilities, required skills tags, benefits, and company details.
6. **Reactive Application Form**:
   - Fields: First Name, Last Name, Email, Mobile Number, Experience, Current Company, Current CTC, Expected CTC, Notice Period, Resume Upload, and Cover Letter.
7. **Form Validation**:
   - Required fields check.
   - Email format validation.
   - 10-digit mobile number format validation.
   - Resume file type validation (accepts `.pdf` and `.docx` only).
   - Maximum resume file size limit check (up to 2MB).
8. **Resume Upload Preview**: Displays file name and formatted size upon selection, with options to remove or replace the file.
9. **Bookmarks**: Allows users to bookmark positions from the search results or details pages. Bookmarks persist via LocalStorage and are accessible under the navbar Bookmarks link.
10. **Recently Viewed Jobs**: Sidebar list displaying the 3 most recently viewed jobs on the details page.
11. **LocalStorage Form Auto-Save**: Automatically saves form inputs as draft progress in real-time, restoring draft values upon browser refresh.
12. **Dark Mode**: Supports class-based manual light/dark theme toggling, persisting the user's preference in LocalStorage.
13. **Loading & Skeleton State**: Displays simulated skeleton loaders when fetching or filtering jobs.
14. **404 Page**: Custom page displaying clean UI redirection for invalid URLs.

---

## 💡 Assumptions

- **Mock Data**: A local list of jobs is managed via the `JobService`. Applications are submitted to a mock endpoint that outputs details to the console and resolves after a simulated API latency of 1.5 seconds.
- **Resume Upload**: Resume files are validated and stored locally in-memory during the application workflow.

---

## ⚠️ Known Limitations

- **File Serialization**: Due to browser sandbox security restrictions, the raw binary resume file object cannot be saved to LocalStorage. If the page is refreshed, only the file name and metadata are recovered in the form draft; the user must re-select the file before submitting.

---

## 🔮 Future Improvements

- **Expand Unit Test Coverage**: Expand unit test coverage for services, filtering logic, and form validation.
- **Backend API Integration**: Connect components to an active database-backed API server.
- **Authentication**: Add user authentication and candidate profile dashboards.
