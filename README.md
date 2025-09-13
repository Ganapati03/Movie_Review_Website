# Movie Review Platform

A full-stack web application for reviewing movies, built with React frontend and Node.js/Express/MongoDB backend.

## Features

- User authentication (register/login)
- Browse movies with search, filters, and pagination
- View movie details, reviews, and ratings
- Add reviews with star ratings
- User profiles with review history
- Watchlist functionality
- OMDB API integration for movie data
- Responsive UI with Material UI
- JWT authentication
- Secure password hashing

## Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Material UI
- Axios
- React Toastify

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT
- Bcrypt
- Joi validation
- CORS
- Helmet
- Rate limiting

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd movieweb
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   cd ..
   ```

4. Create environment variables:
   - The `.env` file is already created. Update it with your values:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     OMDB_API_KEY=your_omdb_api_key
     ```

   - To get a free OMDB API key:
     1. Go to https://www.omdbapi.com/apikey.aspx
     2. Sign up for a free account
     3. Request a free API key (1000 requests/day)
     4. Replace `OMDB_API_KEY=103df37` in `.env` with your new key

5. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

7. Open your browser to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Movies
- `GET /api/movies` - Get all movies (with filters/pagination)
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Add new movie (admin)
- `GET /api/movies/:id/reviews` - Get movie reviews

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Reviews
- `POST /api/movies/:id/reviews` - Add review
- `GET /api/movies/:id/reviews` - Get reviews

### Watchlist
- `GET /api/users/:id/watchlist` - Get user watchlist
- `POST /api/users/:id/watchlist` - Add to watchlist
- `DELETE /api/users/:id/watchlist/:movieId` - Remove from watchlist

## Database Schema

### Users
- username, email, password (hashed), profilePicture, joinDate

### Movies
- title, genre, releaseYear, director, cast, synopsis, posterUrl, averageRating

### Reviews
- userId, movieId, rating, reviewText, timestamp

### Watchlist
- userId, movieId, dateAdded

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC
