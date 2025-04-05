# LMS DevStack - Project Report

## Overview
This project is a comprehensive Learning Management System (LMS) with:
- User authentication and role management
- Course creation and management
- Student enrollment system
- Payment processing
- Content delivery platform

## Features
- **User Management**:
  - Student and educator roles
  - Profile management
  - Enrollment tracking
- **Course System**:
  - Course creation with chapters/lectures
  - Content organization
  - Progress tracking
- **Payment Integration**:
  - Secure payment processing
  - Enrollment management
- **Admin Controls**:
  - User management
  - Course approval
  - Analytics

## Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB with Mongoose
- **Authentication**: Clerk
- **Payments**: Stripe
- **Webhooks**: Svix

## Project Structure
```
LMS-DevStack/
├── client/                 # Frontend application
│   ├── public/             # Static assets
│   └── src/                # React components
├── server/                 # Backend server
│   ├── controllers/        # Business logic
│   ├── models/             # Database models
│   ├── routes/             # API endpoints
│   └── server.js           # Server entry point
├── .env                    # Environment variables
└── README.md               # Project documentation
```

## Environment Variables

### Backend (.env in server directory)
```env
# Authentication
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_API_KEY=your_clerk_api_key

# Database
MONGODB_URI=mongodb://localhost:27017/lms

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Frontend (.env in client directory)
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Environment
VITE_NODE_ENV=development
```

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iaman-mishra/LMS-DevStack.git
   cd LMS-DevStack
   ```

2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server && npm install
   
   # Install frontend dependencies
   cd ../client && npm install
   ```

3. Set up environment variables (see above)

4. Start the development servers:
   ```bash
   # Backend
   npm run dev
   
   # Frontend (in new terminal)
   cd client && npm start
   ```

## Development Workflow

### Key Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend server |
| `cd client && npm start` | Start frontend |
| `npm test` | Run unit tests |
| `npm run test:integration` | Run integration tests |
| `npm run db:seed` | Seed database with test data |

### API Documentation
The backend provides these key endpoints:

**Authentication Routes**
- `POST /api/webhooks/clerk` - Clerk webhook handler
- `GET /api/auth/session` - Get current session

**Course Routes**
- `GET /api/courses` - List all courses
- `POST /api/courses` - Create new course
- `GET /api/courses/:id` - Get course details

## Deployment

### Production Build
```bash
npm run build
```

### Deployment Requirements
1. Configure production environment variables
2. Set up MongoDB Atlas for database
3. Configure Clerk production instance
4. Set up Stripe production keys

## Contributing
To contribute to this project:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support
For questions or support, please contact:
- Email: amanmishra.5272@gmail.com