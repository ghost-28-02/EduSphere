# EduSphere

EduSphere is a full-stack EdTech platform that enables instructors to create and sell courses while allowing students to browse, enroll, and learn at their own pace.

## Features

- **Authentication** – Sign up, log in, email OTP verification, and forgot/reset password flows
- **Course Catalog** – Browse courses by category with detailed course pages
- **Student Dashboard** – Enrolled courses, progress tracking, and profile management
- **Instructor Dashboard** – Create, edit, and manage courses; view revenue analytics
- **Course Player** – Video lectures with progress tracking
- **Payments** – Razorpay integration for course purchases
- **Media Uploads** – Cloudinary-backed image and video uploads
- **Responsive UI** – Mobile-friendly design powered by Tailwind CSS

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Redux Toolkit, React Router v7, Tailwind CSS |
| Backend | Node.js, Express 5 |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcrypt |
| Payments | Razorpay |
| Media | Cloudinary |
| Email | Nodemailer |

## Project Structure

```
EduSphere/
├── public/              # Static assets & HTML template
├── src/                 # React frontend
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components (Navbar, Footer, etc.)
│   │   └── core/        # Feature-specific components
│   │       ├── Auth/
│   │       ├── Catalog/
│   │       ├── Course/
│   │       ├── Dashboard/
│   │       ├── HomePage/
│   │       └── ViewCourse/
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Top-level route pages
│   ├── reducer/         # Redux store configuration
│   ├── services/        # API service calls
│   ├── slices/          # Redux slices
│   └── utils/           # Utility helpers
└── server/              # Express backend
    ├── config/          # Database & third-party config
    ├── controllers/     # Route controllers
    ├── middlewares/     # Auth and other middleware
    ├── models/          # Mongoose models
    ├── routes/          # API route definitions
    ├── mail/            # Email templates
    └── utils/           # Server utilities
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- [Cloudinary](https://cloudinary.com/) account
- [Razorpay](https://razorpay.com/) account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ghost-28-02/EduSphere.git
   cd EduSphere
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**

   Create a `.env` file inside the `server/` directory:

   ```env
   PORT=5000
   MONGODB_URL=your_mongodb_connection_string

   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=24h

   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   MAIL_HOST=smtp.example.com
   MAIL_USER=your_email@example.com
   MAIL_PASS=your_email_password

   RAZORPAY_KEY=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_key_secret
   ```

### Running the App

**Development (frontend + backend together)**

```bash
npm run dev
```

**Frontend only**

```bash
npm start
```

**Backend only**

```bash
npm run server
```

The React app runs on `http://localhost:3000` and the Express API on `http://localhost:5000` by default.

### Building for Production

```bash
npm run build
```

The optimized build is output to the `build/` directory.

## API Overview

| Prefix | Description |
|--------|-------------|
| `/api/v1/auth` | Registration, login, OTP, password reset |
| `/api/v1/profile` | User profile management |
| `/api/v1/course` | Course CRUD and enrollment |
| `/api/v1/payment` | Razorpay payment flow |
| `/api/v1/reach` | Contact form submissions |

## License

This project is open-source and available under the [MIT License](LICENSE).
