# EduSphere - Full-Stack EdTech Platform

EduSphere is a feature-rich, full-stack **Educational Technology (EdTech) platform** that enables instructors to create and sell online courses while giving students an immersive, interactive learning experience. Built with the **MERN stack**, it includes a payment gateway, cloud media storage, email notifications, and role-based access control.

Live demo: [https://edu-sphere-weld.vercel.app](https://edu-sphere-weld.vercel.app)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Run the Application](#4-run-the-application)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [User Roles](#user-roles)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Student
- Browse and search courses by category
- View detailed course information (curriculum, instructor, reviews)
- Add courses to a shopping cart and purchase via **Razorpay**
- Access enrolled courses and watch video lectures
- Track learning progress per course
- Rate and review completed courses
- Manage profile, avatar, and account settings

### Instructor
- Create, edit, and publish courses
- Organise content into **Sections** and **Sub-sections** (video lectures)
- Upload video lectures and thumbnails to **Cloudinary**
- View instructor dashboard with revenue analytics and charts

### Admin
- Create and manage course categories
- Platform-wide content management

### Authentication & Security
- Email + OTP-based signup verification
- JWT-based stateless authentication
- Role-based route protection (Student / Instructor / Admin)
- Forgot / reset password via email token

### Email Notifications
- OTP verification email on signup
- Payment success and course enrollment confirmation
- Password reset and update notifications
- Contact form acknowledgement

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.2.0 | UI framework |
| React Router DOM | 7.12.0 | Client-side routing |
| Redux Toolkit | 2.11.2 | Global state management |
| Tailwind CSS | 3.4.0 | Utility-first styling |
| Axios | 1.13.2 | HTTP client |
| React Hook Form | 7.71.1 | Form handling & validation |
| Chart.js + React-ChartJS-2 | 4.5.1 / 5.3.1 | Analytics charts |
| Video React | 0.16.0 | Video player |
| Swiper | 12.1.2 | Carousels / sliders |
| React Hot Toast | 2.6.0 | Toast notifications |
| React Dropzone | 15.0.0 | Drag-and-drop file upload |
| React Markdown | 10.1.0 | Markdown rendering |
| React Type Animation | 3.2.0 | Typing animations |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | JavaScript runtime |
| Express | 5.2.1 | Web framework |
| MongoDB + Mongoose | — / 9.1.2 | Database & ODM |
| JSON Web Token | 9.0.3 | Authentication tokens |
| Bcrypt | 6.0.0 | Password hashing |
| Cloudinary | 2.8.0 | Image & video cloud storage |
| Razorpay | 2.9.6 | Payment gateway |
| Resend | — | Transactional emails |
| OTP Generator | 4.0.1 | One-time password generation |
| Express File Upload | 1.5.2 | Multipart file handling |
| Cookie Parser | 1.4.7 | Cookie handling |
| CORS | 2.8.5 | Cross-origin resource sharing |
| Dotenv | 17.2.3 | Environment variable management |
| Nodemon | 3.1.11 | Dev auto-restart |

---

## Screenshots

> Add screenshots of the Home page, Course Catalog, Course Details, Dashboard, and Video Player pages here.

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (v9 or later)
- [MongoDB](https://www.mongodb.com/) — local instance **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- [Cloudinary](https://cloudinary.com/) account (for image & video uploads)
- [Razorpay](https://razorpay.com/) account (for payment processing)
- [Resend](https://resend.com/) account (for transactional emails)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ghost-28-02/EduSphere.git
cd EduSphere
```

### 2. Install Dependencies

**Install all dependencies from the root** (installs both frontend and backend packages):

```bash
# Frontend dependencies
cd frontend
npm install
cd ..

# Backend dependencies
cd backend
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file inside the **`backend/`** directory and populate it with your credentials:

```env
# ── Server ────────────────────────────────────────────────
PORT=5000

# ── MongoDB ───────────────────────────────────────────────
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/edusphere

# ── JWT ───────────────────────────────────────────────────
JWT_SECRET=your_jwt_secret_key

# ── Cloudinary ────────────────────────────────────────────
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ── Razorpay ──────────────────────────────────────────────
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret

# ── Email (Brevo) ─────────────────────────────────────────
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=EduSphere
```

> **Tip:** Verify your sender domain in Brevo and use a verified `BREVO_SENDER_EMAIL`.

### 4. Run the Application

#### Development (Frontend + Backend concurrently)

From the **project root**, run:

```bash
cd frontend
npm run dev
```

This starts both servers simultaneously:
- **React frontend** → [http://localhost:3000](http://localhost:3000)
- **Express backend** → [http://localhost:5000](http://localhost:5000)

#### Run Separately

```bash
# Frontend only
cd frontend
npm start

# Backend only
cd backend
npm run server
```

---

## Project Structure

```
EduSphere/
├── README.md                         # Project overview, setup instructions
├── backend/                          # Node.js + Express backend
│   ├── .gitignore                    # Backend-specific gitignore rules
│   ├── index.js                      # Backend entry point (Express app bootstrap)
│   ├── package.json                  # Backend dependencies & scripts
│   ├── package-lock.json             # Locked dependency tree
│   ├── config/                       # External service + DB configuration
│   │   ├── cloudinary.js             # Cloudinary config (uploads/media)
│   │   ├── database.js               # Database connection config (likely MongoDB)
│   │   └── razorpay.js               # Razorpay payment gateway config
│   ├── controllers/                  # Request handlers (business logic)
│   │   ├── Auth.js                   # Auth flows: signup/login/logout, tokens, etc.
│   │   ├── Category.js               # Course category CRUD/logic
│   │   ├── ContactUs.js              # Contact-us form handling
│   │   ├── Course.js                 # Course creation, updates, fetching, publish, etc.
│   │   ├── Payments.js               # Payment capture/verification + enrollment logic
│   │   ├── Profile.js                # Profile read/update logic
│   │   ├── RatingAndReview.js        # Ratings & reviews CRUD/aggregation
│   │   ├── ResetPassword.js          # Forgot/reset password flows
│   │   ├── Section.js                # Course section CRUD/ordering
│   │   ├── SubSection.js             # Subsection/lectures CRUD/ordering
│   │   └── courseProgress.js         # Track/compute course progress
│   ├── middlewares/                  # Express middlewares
│   │   └── auth.js                   # Auth middleware (JWT verification, roles, etc.)
│   ├── models/                       # Database models (schemas)
│   │   ├── Category.js               # Category schema
│   │   ├── Contact.js                # Contact form submissions schema
│   │   ├── Course.js                 # Course schema
│   │   ├── CourseProgress.js         # Progress tracking schema
│   │   ├── OTP.js                    # OTP schema (email/phone verification)
│   │   ├── Profile.js                # Profile schema
│   │   ├── RatingAndReview.js        # Ratings & reviews schema
│   │   ├── Section.js                # Section schema
│   │   ├── SubSection.js             # Subsection/lecture schema
│   │   └── User.js                   # User schema (roles: student/instructor/admin)
│   ├── routes/                       # Express routes (API endpoints)
│   │   ├── Contact.js                # Routes for contact-us
│   │   ├── Course.js                 # Routes for courses/sections/subsections
│   │   ├── Payments.js               # Routes for payments + enrollment
│   │   ├── Profile.js                # Routes for profile actions
│   │   └── User.js                   # Routes for auth/user actions
│   ├── utils/                        # Shared backend utilities/helpers
│   │   ├── cloudinaryUploader.js     # Media upload helper wrapper (Cloudinary)
│   │   ├── mailSender.js             # Email sending utility (Resend or similar)
│   │   └── secToDuration.js          # Convert seconds -> duration string (hh:mm:ss etc.)
│   └── mail/                         # Email templates and mail-related code
│       └── templates/                # Email HTML/text templates
│           ├── contactUsAdmin.js      # Email template to admin on new contact message
│           ├── contactUsUser.js       # Confirmation email template to user
│           ├── courseEnrollment.js    # Enrollment confirmation email template
│           ├── emailVerification.js   # Verify email (OTP/link) template
│           ├── passwordReset.js       # Password reset email template
│           ├── passwordUpdate.js      # Password updated notification template
│           └── paymentSuccessEmail.js # Payment success receipt/confirmation template
└── frontend/                         # React frontend (client)
    ├── .gitignore                    # Frontend-specific gitignore rules
    ├── package.json                  # Frontend dependencies & scripts
    ├── package-lock.json             # Locked dependency tree
    ├── tailwind.config.js            # Tailwind CSS configuration
    ├── public/                       # Static HTML & public assets
    │   ├── index.html                # Root HTML template
    │   ├── favicon.ico               # Browser tab icon
    │   ├── manifest.json             # PWA manifest (if used)
    │   ├── robots.txt                # SEO crawler directives
    │   ├── logo192.png               # PWA/icon asset
    │   └── logo512.png               # PWA/icon asset
    └── src/                          # React application source
        ├── index.js                  # React entry point (renders <App />)
        ├── index.css                 # Global styles (Tailwind base + custom)
        ├── App.js                    # App root component (routes/layout)
        ├── App.css                   # App-level CSS (if not purely Tailwind)
        ├── assets/                   # Images, logos, icons
        │   ├── Images/               # General UI images
        │   ├── Logo/                 # Branding logos
        │   └── TimeLineLogo/         # Timeline/feature icons
        ├── components/               # Reusable UI components
        │   ├── common/               # Navbar, Footer, Button, Spinner, Modals, etc.
        │   └── core/                 # Feature/domain components
        │       ├── Auth/             # Login, Signup, OTP/verification UI (if present)
        │       ├── HomePage/         # Hero, Timeline, ExploreMore, etc. (if present)
        │       ├── Dashboard/        # Student & Instructor dashboards (if present)
        │       ├── Course/           # Course details UI, accordion, curriculum (if present)
        │       ├── Catalog/          # Category browsing UI (if present)
        │       ├── ViewCourse/       # Video player, sidebar, progress UI (if present)
        │       ├── AboutPage/        # About page sections (if present)
        │       └── ContactPage/      # Contact form sections (if present)
        ├── pages/                    # Route-level page components
        │   ├── Home.jsx              # Landing/home page
        │   ├── About.jsx             # About page
        │   ├── Contact.jsx           # Contact page
        │   ├── Catalog.jsx           # Catalog page (browse courses)
        │   ├── CourseDetails.jsx     # Course details page (overview + buy/enroll)
        │   ├── ViewCourse.jsx        # Course consumption page (lectures)
        │   ├── Dashboard.jsx         # Dashboard wrapper page
        │   ├── Login.js              # Login page
        │   ├── Signup.js             # Signup page
        │   ├── ForgotPassword.jsx    # Forgot password page
        │   ├── UpdatePassword.jsx    # Update/reset password page
        │   ├── VerifyEmail.jsx       # Email verification page
        │   └── Error.jsx             # 404/route error page
        ├── data/                     # Static data/constants for UI
        │   ├── countrycode.json      # Country codes dataset
        │   ├── dashboard-links.js    # Sidebar/dashboard navigation config
        │   ├── footer-links.js       # Footer links config
        │   ├── homepage-explore.js   # Home page “explore” sections config
        │   └── navbar-links.js       # Navbar links config
        ├── hooks/                    # Custom React hooks
        │   └── useOnClickOutside.js  # Detect outside clicks (dropdowns/modals)
        ├── reducer/                  # Redux root reducer (or reducer composition)
        │   └── index.js              # Combine reducers / configure root reducer
        ├── slices/                   # Redux slices (state modules)
        │   ├── authSlice.js          # Auth state (token, user, loading)
        │   ├── cartSlice.js          # Cart state (items, totals)
        │   ├── courseSlice.js        # Course creation/editing state (instructor)
        │   ├── profileSlice.js       # Profile state (user profile data)
        │   └── viewCourseSlice.js    # Course viewing/progress state
        ├── services/                 # API + integration layer
        │   ├── apis.js               # All API endpoint constants
        │   ├── apiConnector.js       # Axios/fetch wrapper + interceptors
        │   ├── formatDate.js         # Date formatting helper for UI
        │   └── operations/           # High-level API calls (auth/course/payment actions)
        └── utils/                    # Frontend helper utilities
            ├── avgRating.js          # Compute average ratings from reviews
            ├── constants.js          # Shared constants (roles, enums, etc.)
            └── dateFormatter.js      # Additional date formatting helpers
```

---

## API Reference

All API routes are prefixed with `/api/v1`.

### Authentication - `/api/v1/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | Login and receive JWT | Public |
| POST | `/sendotp` | Send OTP to email | Public |
| POST | `/changePassword` | Change current password | Required |
| POST | `/reset-password-token` | Request password reset email | Public |
| POST | `/reset-password` | Reset password using token | Public |

### Courses - `/api/v1/course`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getAllCourses` | List all published courses | Public |
| POST | `/getCourseDetails` | Get details of a single course | Public |
| POST | `/getFullCourseDetails` | Get course with all sections & videos | Required |
| POST | `/createCourse` | Create a new course | Instructor |
| POST | `/editCourse` | Update an existing course | Instructor |
| DELETE | `/deleteCourse` | Delete a course | Instructor |
| GET | `/getInstructorCourses` | Get instructor's own courses | Instructor |
| POST | `/addSection` | Add a section to a course | Instructor |
| POST | `/updateSection` | Edit a section | Instructor |
| POST | `/deleteSection` | Remove a section | Instructor |
| POST | `/addSubSection` | Upload a video lecture | Instructor |
| POST | `/updateSubSection` | Edit a video lecture | Instructor |
| POST | `/deleteSubSection` | Remove a video lecture | Instructor |
| POST | `/createCategory` | Create a course category | Admin |
| GET | `/showAllCategories` | List all categories | Public |
| POST | `/getCategoryPageDetails` | Get courses in a category | Public |
| POST | `/createRating` | Submit a rating & review | Student |
| GET | `/getAverageRating` | Get average rating for a course | Public |
| GET | `/getAllRating` | Get all ratings for a course | Public |
| POST | `/updateCourseProgress` | Mark a lecture as complete | Student |

### Profile - `/api/v1/profile`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getUserDetails` | Get authenticated user's profile | Required |
| PUT | `/updateProfile` | Update profile information | Required |
| PUT | `/updateProfilePicture` | Upload new profile picture | Required |
| DELETE | `/deleteAccount` | Permanently delete account | Required |
| GET | `/getEnrolledCourses` | Get student's enrolled courses | Required |
| GET | `/instructorDashboard` | Get instructor analytics data | Instructor |

### Payments - `/api/v1/payment`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/capturePayment` | Initiate a Razorpay order | Student |
| POST | `/verifyPayment` | Verify payment & enroll in course | Student |
| POST | `/sendPaymentSuccessEmail` | Send payment confirmation email | Student |

### Contact - `/api/v1/reach`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/contact` | Submit the contact form | Public |

---

## User Roles

EduSphere has three distinct account types, each with different permissions:

| Role | Description |
|---|---|
| **Student** | Browse, purchase, and consume courses; track progress; leave reviews |
| **Instructor** | Create and manage courses, sections, and video lectures; view analytics |
| **Admin** | Manage course categories and platform-wide content |

---

## Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** targeting the `main` branch

Please follow the existing code style and include clear commit messages.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Made by the EduSphere team</p>
