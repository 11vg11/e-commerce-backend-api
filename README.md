# E-Commerce Backend API

A Node.js and Express REST API for an e-commerce application. The project uses MongoDB through Mongoose and provides authentication, role-based access control, product management foundations, and a customer shopping cart.

> **Project status:** under active development. Authentication, role-based product management, cart management, and checkout/orders are implemented. Broader test coverage, payments, and deployment are still planned.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Customer and admin roles
- MongoDB user, product, and cart models
- Cart item add, update, remove, clear, and retrieve operations
- Security and HTTP middleware: Helmet, CORS, Morgan, and JSON parsing

## Tech Stack

- Node.js
- Express 5
- MongoDB and Mongoose
- JSON Web Token (`jsonwebtoken`)
- bcrypt
- dotenv
- Helmet, CORS, and Morgan

## Getting Started

### Prerequisites

- Node.js (current LTS recommended)
- A MongoDB database or MongoDB Atlas connection string

### Installation

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=use_a_long_random_secret
JWT_EXPIRE=7d
```

Start the API:

```bash
npm run dev
```

For a normal start without Nodemon:

```bash
npm start
```

When the server and database are running, `GET /` returns:

```json
{ "message": "E-commerce API running" }
```

## Architecture

```text
Client
  ↓
Express routes
  ↓
Controllers
  ↓
Services
  ↓
Mongoose models
  ↓
MongoDB
```

## Project Structure

```text
src/
├── config/          # Database connection
├── constants/       # Shared role constants
├── controllers/     # HTTP request handlers
├── middleware/      # Authentication, authorization, and global error handling
├── models/          # User, Product, Cart, and Order schemas
├── routes/          # API route definitions
├── services/        # Business logic
├── utils/           # JWT helper
├── app.js           # Express configuration and route mounting
└── server.js        # Environment loading, database connection, startup
postman.json              # Local Postman environment variables
postman_collection.json   # Importable API request collection
```

## API Routes

All protected routes require this header:

```http
Authorization: Bearer <jwt_token>
```

### Available authentication routes

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/users/register` | Create a customer account | Public |
| POST | `/api/users/login` | Sign in and receive a JWT | Public |

Example registration body:

```json
{
  "username": "alex",
  "email": "alex@example.com",
  "password": "secure-password"
}
```

### Cart routes

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| GET | `/api/cart` | Get the current user's cart | Authenticated customer |
| POST | `/api/cart` | Add an item (`productId`, `quantity`) | Authenticated customer |
| PUT | `/api/cart/:productId` | Set an item's quantity | Authenticated customer |
| DELETE | `/api/cart/:productId` | Remove an item | Authenticated customer |
| DELETE | `/api/cart` | Clear the cart | Authenticated customer |

The cart service validates that quantities are positive integers and checks product availability and stock.

### Product and admin routes

| Method | Route | Intended access |
| --- | --- | --- |
| POST | `/api/products` | Admin |
| GET | `/api/products` | Public |
| GET | `/api/products/:id` | Public |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin (soft delete) |
| GET | `/api/admin/dashboard` | Admin |

Product management is restricted to authenticated admins. Public visitors can list active products and retrieve an active product by ID.

### Order routes

| Method | Route | Description | Access |
| --- | --- | --- | --- |
| POST | `/api/orders/checkout` | Create an order from the current cart | Authenticated user |
| GET | `/api/orders/my-orders` | List the current user's orders | Authenticated user |
| GET | `/api/orders/:id` | Get an order; users can access only their own | Authenticated user or admin |
| GET | `/api/orders` | List all orders | Admin |

Checkout creates an order, reduces stock, and clears the cart in one MongoDB transaction. MongoDB transactions require a replica set; MongoDB Atlas supports this by default.

## Error Responses

Unknown routes and uncaught errors are handled by global middleware and return a consistent response shape:

```json
{
  "success": false,
  "message": "Error description"
}
```

Mongoose validation and invalid IDs return HTTP 400, duplicate records return HTTP 409, and unknown routes return HTTP 404.

## Development Phases

| Phase | Status | Scope |
| --- | --- | --- |
| 1. Foundation | Complete | Express app, environment loading, MongoDB connection, base middleware, and server startup |
| 2. Authentication | Complete | User model, registration, login, bcrypt password hashing, JWT creation, and authentication middleware |
| 3. Product module | Implemented; needs testing | Product schema, public read routes, and admin-only create, update, and soft-delete operations |
| 4. Cart module | Implemented; needs testing | Cart schema, authenticated cart routes, stock-aware add/update logic, and cart clearing |
| 5. Role-based access | Implemented; needs testing | Customer/admin roles, JWT-based authorization, and an admin dashboard route |
| 6. Validation and error handling | Partially complete | Mongoose schema validation and global error/not-found middleware; route request validation remains |
| 7. Security hardening | Partially complete | Helmet, CORS, and Morgan are enabled; rate limiting and production CORS configuration remain |
| 8. Orders and checkout | Implemented; needs integration testing | Transactional checkout, order creation, stock reduction, cart clearing, and order history |
| 9. Testing and API docs | Partially complete | Offline unit tests and an importable Postman collection; database integration tests remain |
| 10. Deployment | Planned | Production configuration and deployment |

## Current Follow-up Work

Before treating the API as production-ready, complete these items:

1. Add request validation and consistent client-error responses for every endpoint.
2. Add payment processing and controlled order-status updates, including safe cancellation/restocking rules.
3. Add MongoDB integration tests for products, carts, and checkout transactions.
4. Add rate limiting and restrict CORS origins for production.

## Data Models

### User

`username`, `email`, `password`, `role`, timestamps

Roles: `customer` (default) and `admin`.

### Product

`name`, `description`, `price`, `stock`, `category`, `isActive`, timestamps

Products use `isActive` for soft deletion.

### Cart

One cart per user containing product references and quantities.

### Order

`user`, `items` (product, name, price, quantity), `totalAmount`, `status`, timestamps

An order keeps a snapshot of each product name and price at checkout time. Initial status is `placed`.

## Security Notes

- Never commit `.env`; it is already ignored by Git.
- Use a strong, unique `JWT_SECRET` in every deployed environment.
- API clients should store tokens securely and send them only over HTTPS in production.

## Testing

Run the offline test suite:

```bash
npm test
```

The suite covers JWT authentication, role authorization, global error middleware, and Mongoose model validation. Database integration tests are the next testing milestone.

## Postman

Import both `postman_collection.json` and `postman.json` into Postman, select the local environment, then use **Login** to populate the `token` variable automatically. Set `productId` and `orderId` after creating the relevant records. Admin-only requests require a JWT for a user with the `admin` role.

## License

ISC
