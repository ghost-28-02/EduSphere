# 🎓 EduSphere — Full-Stack EdTech Platform

EduSphere is a feature-rich, full-stack **Educational Technology (EdTech) platform** that enables instructors to create and sell online courses while giving students an immersive, interactive learning experience. Built with the **MERN stack**, it includes a payment gateway, cloud media storage, email notifications, and role-based access control.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Run the Application](#4-run-the-application)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [User Roles](#-user-roles)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 👨‍🎓 Student
- Browse and search courses by category
- View detailed course information (curriculum, instructor, reviews)
- Add courses to a shopping cart and purchase via **Razorpay**
- Access enrolled courses and watch video lectures
- Track learning progress per course
- Rate and review completed courses
- Manage profile, avatar, and account settings

### 👨‍🏫 Instructor
- Create, edit, and publish courses
- Organise content into **Sections** and **Sub-sections** (video lectures)
- Upload video lectures and thumbnails to **Cloudinary**
- View instructor dashboard with revenue analytics and charts

### 🛡️ Admin
- Create and manage course categories
- Platform-wide content management

### 🔐 Authentication & Security
- Email + OTP-based signup verification
- JWT-based stateless authentication
- Role-based route protection (Student / Instructor / Admin)
- Forgot / reset password via email token

### 📧 Email Notifications
- OTP verification email on signup
- Payment success and course enrollment confirmation
- Password reset and update notifications
- Contact form acknowledgement

---

## 🛠 Tech Stack

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
| Nodemailer | 7.0.12 | Transactional emails |
| OTP Generator | 4.0.1 | One-time password generation |
| Express File Upload | 1.5.2 | Multipart file handling |
| Cookie Parser | 1.4.7 | Cookie handling |
| CORS | 2.8.5 | Cross-origin resource sharing |
| Dotenv | 17.2.3 | Environment variable management |
| Nodemon | 3.1.11 | Dev auto-restart |

---

## 🖼 Screenshots

> Add screenshots of the Home page, Course Catalog, Course Details, Dashboard, and Video Player pages here.

---

## ✅ Prerequisites

Make sure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (v9 or later)
- [MongoDB](https://www.mongodb.com/) — local instance **or** a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- [Cloudinary](https://cloudinary.com/) account (for image & video uploads)
- [Razorpay](https://razorpay.com/) account (for payment processing)
- An SMTP email provider (e.g., Gmail, SendGrid, Mailtrap)

---

## 🚀 Getting Started

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

# ── Email (SMTP) ──────────────────────────────────────────
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_app_password
```

> **Tip:** If using Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) instead of your account password.

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

## 📁 Project Structure

```
EduSphere/
├── public/                       # Static HTML & assets
├── src/                          # React frontend
│   ├── assets/                   # Images & logos
│   ├── components/
│   │   ├── common/               # Navbar, Footer, Button, Spinner, etc.
│   │   └── core/
│   │       ├── Auth/             # Login, Signup, OTP components
│   │       ├── HomePage/         # Hero, Timeline, ExploreMore, etc.
│   │       ├── Dashboard/        # Student & Instructor dashboards
│   │       ├── Course/           # Course details & accordion
│   │       ├── Catalog/          # Browse courses by category
│   │       ├── ViewCourse/       # Video player & sidebar
│   │       ├── AboutPage/        # About page sections
│   │       └── ContactPage/      # Contact form sections
│   ├── pages/                    # Route-level page components
│   ├── services/
│   │   ├── apis.js               # All API endpoint constants
│   │   ├── apiConnector.js       # Axios instance & interceptors
│   │   └── operations/           # Business logic API calls
│   ├── slices/                   # Redux state slices
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Helper functions & constants
│   ├── data/                     # Static data (home page content, etc.)
│   ├── App.js                    # Root component & route definitions
│   └── index.js                  # React entry point
├── server/                       # Express backend
│   ├── config/
│   │   ├── database.js           # MongoDB connection
│   │   ├── cloudinary.js         # Cloudinary SDK setup
│   │   └── razorpay.js           # Razorpay SDK setup
│   ├── controllers/              # Route handler logic
│   ├── middlewares/
│   │   └── auth.js               # JWT auth & role guards
│   ├── models/                   # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Section.js
│   │   ├── SubSection.js
│   │   ├── Category.js
│   │   ├── RatingAndReview.js
│   │   ├── CourseProgress.js
│   │   ├── OTP.js
│   │   ├── Profile.js
│   │   └── Contact.js
│   ├── routes/                   # Express routers
│   │   ├── User.js               # /api/v1/auth
│   │   ├── Course.js             # /api/v1/course
│   │   ├── Profile.js            # /api/v1/profile
│   │   ├── Payments.js           # /api/v1/payment
│   │   └── Contact.js            # /api/v1/reach
│   ├── utils/                    # Server utilities
│   │   ├── mailSender.js
│   │   ├── cloudinaryUploader.js
│   │   └── secToDuration.js
│   ├── mail/templates/           # HTML email templates
│   └── index.js                  # Server entry point
├── package.json                  # Root (frontend) package manifest
├── tailwind.config.js            # Tailwind CSS config
└── .gitignore
```

---

## 📡 API Reference

All API routes are prefixed with `/api/v1`.

### 🔑 Authentication — `/api/v1/auth`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | Login and receive JWT | Public |
| POST | `/sendotp` | Send OTP to email | Public |
| POST | `/changePassword` | Change current password | 🔒 Required |
| POST | `/reset-password-token` | Request password reset email | Public |
| POST | `/reset-password` | Reset password using token | Public |

### 📚 Courses — `/api/v1/course`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getAllCourses` | List all published courses | Public |
| POST | `/getCourseDetails` | Get details of a single course | Public |
| POST | `/getFullCourseDetails` | Get course with all sections & videos | 🔒 Required |
| POST | `/createCourse` | Create a new course | 🔒 Instructor |
| POST | `/editCourse` | Update an existing course | 🔒 Instructor |
| DELETE | `/deleteCourse` | Delete a course | 🔒 Instructor |
| GET | `/getInstructorCourses` | Get instructor's own courses | 🔒 Instructor |
| POST | `/addSection` | Add a section to a course | 🔒 Instructor |
| POST | `/updateSection` | Edit a section | 🔒 Instructor |
| POST | `/deleteSection` | Remove a section | 🔒 Instructor |
| POST | `/addSubSection` | Upload a video lecture | 🔒 Instructor |
| POST | `/updateSubSection` | Edit a video lecture | 🔒 Instructor |
| POST | `/deleteSubSection` | Remove a video lecture | 🔒 Instructor |
| POST | `/createCategory` | Create a course category | 🔒 Admin |
| GET | `/showAllCategories` | List all categories | Public |
| POST | `/getCategoryPageDetails` | Get courses in a category | Public |
| POST | `/createRating` | Submit a rating & review | 🔒 Student |
| GET | `/getAverageRating` | Get average rating for a course | Public |
| GET | `/getAllRating` | Get all ratings for a course | Public |
| POST | `/updateCourseProgress` | Mark a lecture as complete | 🔒 Student |

### 👤 Profile — `/api/v1/profile`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/getUserDetails` | Get authenticated user's profile | 🔒 Required |
| PUT | `/updateProfile` | Update profile information | 🔒 Required |
| PUT | `/updateProfilePicture` | Upload new profile picture | 🔒 Required |
| DELETE | `/deleteAccount` | Permanently delete account | 🔒 Required |
| GET | `/getEnrolledCourses` | Get student's enrolled courses | 🔒 Required |
| GET | `/instructorDashboard` | Get instructor analytics data | 🔒 Instructor |

### 💳 Payments — `/api/v1/payment`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/capturePayment` | Initiate a Razorpay order | 🔒 Student |
| POST | `/verifyPayment` | Verify payment & enroll in course | 🔒 Student |
| POST | `/sendPaymentSuccessEmail` | Send payment confirmation email | 🔒 Student |

### 📬 Contact — `/api/v1/reach`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/contact` | Submit the contact form | Public |

---

## 👥 User Roles

EduSphere has three distinct account types, each with different permissions:

| Role | Description |
|---|---|
| **Student** | Browse, purchase, and consume courses; track progress; leave reviews |
| **Instructor** | Create and manage courses, sections, and video lectures; view analytics |
| **Admin** | Manage course categories and platform-wide content |

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** targeting the `main` branch

Please follow the existing code style and include clear commit messages.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by the EduSphere team</p>
