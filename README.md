![Banner](/frontend/public/banner.png)

# 🍔 SwiftBites

[![Build Status](https://img.shields.io/badge/build-Deployed-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Tech Stack](https://img.shields.io/badge/tech-MERN-orange)]()

**SwiftBites** is a full-stack e-commerce web application built with the **MERN stack**, focused on clean architecture, real-world backend design, and a modern, scalable frontend.  
It supports product browsing, filtering, cart management, authentication, and order handling — with the backend fully deployed and consumed by the frontend.

---

## 🚀 Live Backend API
🔗 https://swiftbites-backend-cwmy.onrender.com

Example:
```http
GET /api/products
```

## 🧠 Core Features
#### 🛍 Product Management
- List all products
- View single product details
- Filter by category
- Search products by name
- Sort by:
- Price (low → high)
- Newest
- Popularity (reviews count)

🧾 Product Reviews
- Fetch reviews for a product
- Add product reviews
- Automatic review count updates

🛒 Shopping Cart
- Add items to cart
- Remove items from cart
- Update item quantity
- Clear cart
- Cart stored per user

👤 User Authentication
- User registration
- User login
- Google OAuth login
- JWT-based authentication
- Protected routes (cart, orders, profile)

#### 📦 Orders
- Place orders (payment intentionally skipped for now)
- View user order history
- View single order details
- Update order status (admin-ready)

#### 🔔 Notifications
- Create user notifications
- Fetch notifications
- Mark notifications as read

🧱 Tech Stack
#### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Axios
- Render (Deployment)

#### Frontend 
- React
- Axios (with interceptors)
- React Router
- react-toastify
- Modular component architecture

## Project Structure
```bash
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 └── server.js

frontend/
 ├── components/
 │   └── ProductCard/
 ├── pages/
 ├── api/
 └── App.jsx
```

#### 🔐 Authentication Flow
JWT generated on login/register
Token stored in localStorage
Axios interceptor attaches token automatically
Protected routes enforced via middleware

#### 🧪 API Highlights
```http
GET    /api/products
GET    /api/products/:id
GET    /api/products/category/:category
GET    /api/products/search?query=apple
GET    /api/products/sort?by=price&order=asc
POST   /api/cart
POST   /api/auth/login
POST   /api/auth/register
```

Author
[Dave](https://github.com/davex-ai)