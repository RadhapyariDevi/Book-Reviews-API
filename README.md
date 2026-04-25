# 📚 Book Reviews API

A RESTful API for managing books and user reviews.
Built with Node.js, Express, Prisma, and PostgreSQL.

## Features
- 📚Retrieve a list of all books available in the bookshop
- 🔍Search for books by ISBN, title, or author name
- 📗View detailed information for a specific book
- 📝Retrieve reviews/comments for a selected book
- 🔐User Authentication
  - Register as a new user
  - Login to the application
- ⭐Review Management (Authenticated Users Only)
  - Add a new review for a book
  - Modify your own review
  - Delete your own review

## Tech Stacks
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication


## 📁Project Structure

```text
├── prisma/               # Prisma schema and database migrations
├── src/
│   ├── config/           # Database and general configurations
│   ├── controllers/      # Logic for handling API requests
│   ├── middleware/       # Auth and validation middleware
│   ├── routes/           # API endpoint definitions
│   ├── utils/            # Helper functions (e.g., token generation)
│   ├── validators/       # Input validation schemas
│   └── server.js         # Entry point of the application
└── package.json          # Dependencies and scripts
```


## API endpoints
### Auth
- POST `/api/auth/signup` – Register a new user  
- POST `/api/auth/login` – Login and receive a JWT
- POST `/api/auth/logout` – Logout and invalidate the JWT
- GET `/api/auth/me` – Retrieve the current user's information (Protected)

### Books
- GET `/api/books` – Retrieve all books in the bookshop
- GET `/api/books/search` – Search for books by title or author name
- GET `/api/books/:isbn` – Retrieve book details by ISBN

### Reviews
- POST `/api/reviews/:isbn` – Add a review for a book (Protected)
- PUT `/api/reviews/:reviewId` – Modify a review (Protected, owner only)
- DELETE `/api/reviews/:reviewId` – Delete a review (Protected, owner only)
- GET `/api/reviews/:isbn` – Retrieve all reviews for a book

### Authentication
`Authorization: Bearer <your_token>`

## 🌍Deployment
Deployed on Render : [https://bookreview-api-d1qu.onrender.com](https://bookreview-api-d1qu.onrender.com)
