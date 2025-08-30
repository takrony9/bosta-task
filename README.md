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

project-root/
├── docker-compose.yml # Orchestration (app + db)
├── Dockerfile # Build NestJS app
├── .dockerignore
├── .env # Environment variables
├── prisma/
│ ├── schema.prisma # Prisma schema
│ └── migrations/ # Auto-generated migrations
├── src/
│ ├── main.ts
│ ├── app.module.ts
│ ├── modules/
│ │ ├── authors/
│ │ ├── books/
│ │ ├── borrowers/
│ │ └── borrowings/
├── test/ # Unit tests
├── package.json
└── tsconfig.json


---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/library-management.git
cd library-management

Install dependencies
npm install

Prisma setup
npx prisma generate
npx prisma migrate dev --name init

🐳 Run with Docker
Build and run
docker-compose up --build



📡 API Endpoints
Authors

POST /authors → Add new author

GET /authors → List all authors

Books

POST /books → Add new book

GET /books → List all books

GET /books/search?title=xxx&isbn=yyy → Search books

Borrowers

POST /borrowers → Register borrower

GET /borrowers → List all borrowers

Borrowings

POST /borrowings → Borrow a book

PATCH /borrowings/:id/return → Return a book (flag as returned)

GET /borrowers/:id/borrowings → Borrower’s current books

GET /borrowings/overdue → List overdue borrowings

GET /borrowings/overdue/export-csv → Export overdue last month (CSV)

GET /borrowings/export-csv/last-month → Export all borrowings last month (CSV)