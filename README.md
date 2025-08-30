# 📚 Library Management System (NestJS + Prisma + MySQL)

A modular **Library Management System** built with **NestJS**, **Prisma ORM**, and **MySQL**.  
This system allows you to manage books, authors, borrowers, and borrowing processes (checkout, return, overdue tracking).

---

## 🚀 Features

- Manage **Authors**, **Books**, **Borrowers**
- Borrowing system with:
  - Checkout / Return books
  - Track overdue books
  - View borrowings per borrower
- Search for books by **title**, **author**, or **ISBN**
- Export reports:
  - All borrowings in the last month (CSV)
  - Overdue borrowings (CSV)
- ✅ Input validation
- ✅ Error handling with meaningful responses
- ✅ Rate limiting for API protection
- ✅ Unit tests (Jest)

---

## 🏗️ Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)  
- **Database**: MySQL 8  
- **ORM**: [Prisma](https://www.prisma.io/)  
- **Validation**: `class-validator`, `class-transformer`  
- **Testing**: Jest  
- **Containerization**: Docker + Docker Compose  

---

## 📂 Folder Structure

```
project-root/
├── docker-compose.yml      # Orchestration (app + db)
├── Dockerfile              # Build NestJS app
├── .dockerignore
├── .env                    # Environment variables
├── prisma/
│   ├── schema.prisma       # Prisma schema
│   └── migrations/         # Auto-generated migrations
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── modules/
│   │   ├── authors/
│   │   ├── books/
│   │   ├── borrowers/
│   │   └── borrowings/
├── test/                   # Unit tests
├── package.json
└── tsconfig.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/library-management.git
cd library-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="mysql://root:yourpassword@localhost:3306/library_db"
```

### 4. Prisma setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### 5. Start the application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

---

## 🐳 Run with Docker

### Build and run

```bash
docker-compose up --build
```

This will start:
- NestJS application on `http://localhost:3000`
- MySQL database on `localhost:3306`

---

## 📡 API Endpoints

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/authors` | Add new author |
| `GET` | `/authors` | List all authors |

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/books` | Add new book |
| `GET` | `/books` | List all books |
| `GET` | `/books/search?title=xxx&isbn=yyy` | Search books |

### Borrowers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/borrowers` | Register borrower |
| `GET` | `/borrowers` | List all borrowers |

### Borrowings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/borrowings` | Borrow a book |
| `PATCH` | `/borrowings/:id/return` | Return a book (flag as returned) |
| `GET` | `/borrowers/:id/borrowings` | Borrower's current books |
| `GET` | `/borrowings/overdue` | List overdue borrowings |
| `GET` | `/borrowings/overdue/export-csv` | Export overdue last month (CSV) |
| `GET` | `/borrowings/export-csv/last-month` | Export all borrowings last month (CSV) |

---

## 🧪 Testing

### Run unit tests

```bash
npm run test
```

### Run e2e tests

```bash
npm run test:e2e
```

### Test coverage

```bash
npm run test:cov
```

---

## 📋 Example API Usage

### Create an Author

```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name": "J.K. Rowling", "age": 58}'
```

### Add a Book

```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher Stone",
    "isbn": "9780747532699",
    "authorId": 1,
    "availableQuantity": 5,
    "shelfLocation": "A1-B2"
  }'
```

### Register a Borrower

```bash
curl -X POST http://localhost:3000/borrowers \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Borrow a Book

```bash
curl -X POST http://localhost:3000/borrowings \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": 1,
    "borrowerId": 1,
    "checkoutDate": "2024-01-15T10:00:00Z",
    "durationDays": 14
  }'
```

---

## 🛠️ Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint

# Database operations
npx prisma studio          # Open Prisma Studio GUI
npx prisma db seed         # Seed database
npx prisma db reset        # Reset database
```

---

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Application port | `3000` |
| `DATABASE_URL` | MySQL connection string | `mysql://root:password@localhost:3306/library_db` |

---

## 📊 Database Schema

The system uses four main entities:

- **Author**: Stores author information
- **Book**: Book details with author relationship
- **Borrower**: Registered library users
- **Borrowing**: Tracks book checkout/return transactions

---