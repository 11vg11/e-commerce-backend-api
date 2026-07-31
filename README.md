# E-Commerce Backend API

## Project Technical Specification / Engineering Handover Document

## 1. Project Overview

### Project Name
E-Commerce Backend API

### Purpose
A scalable REST API backend for an e-commerce platform built with Node.js, Express.js, MongoDB, Mongoose, and JWT authentication. The project began as a simplified MVC assignment using JSON file storage, but it has been redesigned into a more realistic production-style backend using MongoDB.

---

## 2. Main Objective

The backend should provide:

- User registration
- User authentication
- JWT authorization
- Role-based permissions
- Product management
- Shopping cart management
- Order processing
- Inventory control

The target system supports two main user types:

```text
Customer
├── Register
├── Login
├── Browse products
├── Add products to cart
├── Checkout
└── View orders

Admin
├── Login
├── Create products
├── Update products
├── Delete products
├── Manage inventory
└── Manage orders
```

---

## 3. Technology Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### ODM

- Mongoose

### Authentication

- JWT

### Password Security

- bcrypt

### Configuration

- dotenv

Environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

---

## 4. Final Architecture

The project follows a layered MVC-style architecture.

```text
Client
  │
  ▼
Routes
  │
  ▼
Middleware
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Models
  │
  ▼
MongoDB Atlas
```

---

## 5. Folder Structure

Current structure:

```text
ecommerce-backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── auth_controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth_routes.js
│   │   └── user_routes.js
│   ├── services/
│   │   └── auth_service.js
│   ├── utils/
│   │   └── generateTokens.js
│   └── validators/
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 6. Completed Development

## Phase 1 — Project Foundation ✅

### Completed

#### Express Setup
Created:

- src/app.js
- src/server.js

Responsibilities:

- app.js: Express configuration, middleware loading, route registration
- server.js: Environment loading, database connection, server startup

#### MongoDB Connection
Created:

- src/config/database.js

Current flow:

```text
Start Server
  ↓
Load Environment
  ↓
Connect MongoDB
  ↓
Start Express
  ↓
Accept Requests
```

---

## Phase 2 — Authentication System ✅

Completed:

- User model
- Registration endpoint
- Login endpoint
- Password hashing
- JWT generation
- JWT validation

### User Model

File:

- src/models/User.js

Current schema concept:

```json
{
  "username": "String",
  "email": "String",
  "password": "String",
  "role": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

Roles:

```text
customer
admin
```

### Register System

Endpoint:

```http
POST /api/users/register
```

Flow:

```text
Request
  ↓
Controller
  ↓
Service
  ↓
Check existing user
  ↓
Hash password
  ↓
Create MongoDB user
  ↓
Return response
```

### Login System

Endpoint:

```http
POST /api/users/login
```

Flow:

```text
Email + Password
  ↓
Find User
  ↓
Compare bcrypt hash
  ↓
Generate JWT
  ↓
Return token
```

### JWT System

File:

- src/utils/generateTokens.js

JWT payload concept:

```json
{
  "id": "mongodb_user_id",
  "role": "customer"
}
```

Example:

```http
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

### Authentication Middleware

File:

- src/middleware/auth.middleware.js

Purpose:

Protect private routes.

Flow:

```text
Authorization Header
  ↓
Extract Token
  ↓
Verify JWT
  ↓
Attach req.user
  ↓
Continue request
```

---

## Phase 3 — Product Module

### Current Status
In progress.

Completed:

- Product model started

Not yet completed:

- Product service
- Product controller
- Product routes
- Product testing

### Product Database Design

File:

- src/models/Product.js

Current schema concept:

```json
{
  "name": "String",
  "description": "String",
  "price": "Number",
  "stock": "Number",
  "category": "String",
  "isActive": "Boolean"
}
```

Example:

```json
{
  "name": "MacBook Pro M4",
  "description": "16GB RAM Laptop",
  "price": 2499.99,
  "stock": 15,
  "category": "Laptop",
  "isActive": true
}
```

---

## 7. Remaining Development Roadmap

## Phase 3 — Finish Product Module

Status: In progress

Need:

### Product Service
Create:

- src/services/product.service.js

Responsibilities:

- createProduct()
- getProducts()
- getProductById()
- updateProduct()
- deleteProduct()

### Product API Endpoints

```http
POST /api/products
GET /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
```

---

## Phase 4 — Cart System

Status: Not started

Planned files:

- src/models/Cart.js
- src/services/cart.service.js
- src/controllers/cart.controller.js
- src/routes/cart.routes.js

Planned features:

- Add product
- Update quantity
- Remove product
- Clear cart
- Calculate total

---

## Phase 5 — Order System

Status: Not started

Planned files:

- src/models/Order.js
- src/services/order.service.js
- src/controllers/order.controller.js
- src/routes/order.routes.js

Checkout flow:

```text
Customer cart
  ↓
Checkout request
  ↓
Create order
  ↓
Reduce product stock
  ↓
Clear cart
  ↓
Save order
```

---

## Phase 6 — Validation Layer

Status: Not started

Add:

- express-validator

Validate:

- User email format
- User password length
- Product price > 0
- Product stock >= 0
- Product name required

---

## Phase 7 — Security Improvements

Status: Not started

Add:

- helmet
- cors
- rate limiting

Protect against:

- Common attacks
- Abuse
- Invalid requests

---

## Phase 8 — API Documentation

Need:

- API_DOCUMENTATION.md

Document every endpoint with:

- Method
- URL
- Authentication requirement
- Request body
- Response
- Error codes

---

## Phase 9 — Testing

Need:

- Postman collection covering authentication, products, cart, and orders

---

## Phase 10 — Deployment

Future options:

- Render
- Railway
- AWS
- DigitalOcean

Database:

- MongoDB Atlas

---

## 8. Current Completion Percentage

```text
Project Setup            ██████████ 100%
MongoDB                  ██████████ 100%
Authentication           ██████████ 100%
Authorization            ████████░░ 60%
Product Module           ██░░░░░░░░ 20%
Cart System              ░░░░░░░░░░ 0%
Order System             ░░░░░░░░░░ 0%
Validation               ░░░░░░░░░░ 0%
Testing                  ░░░░░░░░░░ 0%
Deployment               ░░░░░░░░░░ 0%
```

---

## 9. Instructions for Future Developers / AI Assistants

When modifying this project:

1. Keep MVC separation.
2. Controllers should handle HTTP only.
3. Services should contain business logic.
4. Models should contain database schemas.
5. Middleware should handle security and authentication.
6. Never put MongoDB queries directly in routes.
7. Never store plain passwords.
8. Never expose JWT secrets.
9. Always use environment variables.
10. Keep API responses consistent.
11. Do not add unnecessary complexity.
12. Follow existing naming conventions.

---

## 10. Current Next Task

### Phase 3 — Step 2

Create:

- src/services/product.service.js

Implement:

- createProduct()
- getProducts()
- getProductById()
- updateProduct()
- deleteProduct()

After that:

```text
Product Controller
  ↓
Product Routes
  ↓
API Testing
```

---

## What We Have Done Since the Last Git Push

- Improved the backend API structure and added more complete endpoints for products, users, carts, and orders.
- Enhanced authentication and user flow support for both admin and customer accounts.
- Added and refined cart and order management functionality to support the full shopping experience.
- Added Postman environment support for local testing with variables such as base URL, auth tokens, and sample IDs.
- Improved local setup and testing documentation to make the project easier to run and verify.

---

## Project Status

Authentication foundation is complete. The backend is ready to start implementing the actual e-commerce business logic.

---

## Quick Start

### Install dependencies

```bash
npm install
```

### Create environment file

```bash
cp .env.example .env
```

### Run development server

```bash
npm run dev
```

### Example API requests

#### Register user

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456"}'
```

#### Login user

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

#### Access protected route

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <your_token>"
```
