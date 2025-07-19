# Fastify API with Drizzle ORM

A RESTful API built with Fastify and Drizzle ORM for PostgreSQL database.

## Features

- TypeScript support
- Fastify for high-performance web server
- Drizzle ORM for type-safe database operations
- PostgreSQL database
- Docker and Docker Compose setup
- API documentation with Swagger

## Prerequisites

- Node.js (v16+)
- Docker and Docker Compose
- PostgreSQL (or use the Docker container)

## Getting Started

1. Clone the repository
2. Configure the environment variables

```bash
# Copy the example environment file
cp .env.example .env

# Update the DATABASE_URL and other configurations
```

3. Install dependencies

```bash
npm install
```

4. Generate Drizzle migrations based on your schema

```bash
npm run db:generate
```

5. Run the migrations

```bash
npm run db:migrate
```

6. Start the development server

```bash
npm run dev
```

## Docker Setup

To run the application using Docker:

```bash
# Build and start containers
docker-compose up

# To run in detached mode
docker-compose up -d
```

The API will be available at http://localhost:3000.

## API Documentation

Once the server is running, you can access the Swagger documentation at:

http://localhost:3000/documentation

## Available Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Tasks

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a task by ID
- `GET /api/users/:userId/tasks` - Get tasks by user ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
.
├── drizzle/               # Database migrations
├── src/                   # Source code
│   ├── controllers/       # Request handlers
│   ├── db/                # Database configuration and schema
│   ├── routes/            # API routes
│   ├── server.ts          # Main application entry
├── .env                   # Environment variables
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker build instructions
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json           # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## License

This project is licensed under the ISC License.
