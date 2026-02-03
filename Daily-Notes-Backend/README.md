# Daily Notes Backend 📝

A secure and scalable backend for a **Daily Notes application**, built with **Node.js, Express, MongoDB, and JWT authentication**.
This project focuses on **clean architecture, proper authorization, and real-world backend practices**.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication (Access Token + Refresh Token)
* Secure logout
* Password change
* Get current authenticated user

### 🗒️ Notes Management

* Create multiple notes per user
* Each note has:

  * Optional title (default: `Untitle`)
  * Multiple content blocks
* Update note title
* Delete note
* Fetch all notes of the current user

### ✏️ Content Management (Subdocuments)

* Add single or multiple contents to a note
* Update individual content using `contentId`
* Delete individual content (including middle content)
* Ownership verification at every step

---

## 🏗️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **JWT (jsonwebtoken)**
* **Cookie-based authentication**
* **RESTful API design**

---

## 📁 Project Structure

```text
src/
├── controllers/
│   ├── user.controller.js
│   └── notes.controller.js
├── db/
│   └── index.js
├── middlewares/
│   ├── auth.middleware.js
│   └── noteAuth.middleware.js
├── models/
│   ├── user.model.js
│   └── notes.model.js
├── routes/
│   ├── user.routes.js
│   └── notes.routes.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   └── asyncHandler.js
├── app.js
├── constants.js
└── index.js
```

---

## 🧠 Data Models

### User Model

* Authentication details
* Stores refresh token securely

### Note Model

* `title` (optional)
* `content` (array of subdocuments)
* `owner` (User reference)

### Content Subdocument

* `text`
* Auto-generated `_id`
* Timestamps

---

## 🔗 API Routes

### 🔑 Auth Routes

```http
POST   /api/v1/users/register
POST   /api/v1/users/login
POST   /api/v1/users/logout
POST   /api/v1/users/refresh-token
POST   /api/v1/users/change-password
POST   /api/v1/users/current-user
PUT    /api/v1/users/update-credentials
```

### 📝 Notes Routes

```http
POST    /api/v1/notes
GET     /api/v1/notes
PUT     /api/v1/notes/:noteId/title
DELETE  /api/v1/notes/:noteId
```

### 📄 Content Routes

```http
POST    /api/v1/notes/:noteId/contents
PUT     /api/v1/notes/:noteId/contents/:contentId
DELETE  /api/v1/notes/:noteId/contents/:contentId
```

---

## 🔒 Security Practices

* JWT verification middleware (`verifyJWT`)
* Ownership validation for notes and contents
* HTTP-only cookies for tokens
* Refresh token rotation
* Input normalization and validation

---

## 📦 Environment Variables

```env
CROS_ORIGIN=origin_name
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=days
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=days
NODE_ENV=development
```

---

## 🛠️ How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🎯 Learning Goals of This Project

* Proper REST API design
* Authentication vs Authorization separation
* Handling subdocuments in MongoDB
* Middleware-driven architecture
* Real-world backend decision making

---

## ⚠️ Notes

* This backend is **functionally complete** for a personal notes application
* Advanced production features like rate-limiting, pagination can be added later
* Designed intentionally simple to focus on **core backend concepts**

---

## 👨‍💻 Author

**Sandip Roy**
Backend-focused developer exploring real-world system design through small but meaningful projects.

---

## ⭐ Final Thought

> *A simple app, built deeply, teaches more than a complex app built blindly.*

Happy building 🚀
