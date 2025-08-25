# Bucket List API Documentation

The **Bucket List API** allows users to register, authenticate, and manage bucket lists with items. It provides endpoints for authentication, user profile management, and CRUD operations on bucket lists and their items.

---

## Base URLs

- **Local Development:** `http://localhost:3000/`
- **Production:** (to be updated when deployed)

---

## Authentication

This API uses **JWT (JSON Web Token)** for authentication.  
- A token is issued when a user logs in.  
- Protected routes require the `Authorization` header:  

```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 1. User Routes

#### **Register User**
- **POST** `/api/users/register`
- Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "msg": "You are now registered"
}
```

---

#### **Login**
- **POST** `/api/auth/login`
- Authenticates a user and returns a JWT.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "token": "JWT <token>",
  "user": {
    "id": "64ff0c6bc12f8a...",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

#### **Logout**
- **POST** `/api/auth/logout`  
- Requires valid JWT.  

**Response:**
```
John Doe is logged out
```

---

#### **User Profile**
- **GET** `/api/users/profile/:username`  
- Displays the user profile.  
  - If the logged-in user requests **their own profile**, full details are shown.  
  - If requesting another user’s profile, **sensitive data** like email is hidden.  

**Response (own profile):**
```json
{
  "id": "64ff0c6bc12f8a...",
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com"
}
```

**Response (other user):**
```json
{
  "name": "Jane Doe",
  "username": "janedoe"
}
```

---

#### **Dashboard**
- **GET** `/api/users/dashboard`  
- Requires JWT.  
- Returns user profile + bucketlists.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "64ff0c6bc12f8a...",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "bucketlists": [
    {
      "_id": "6500a7bcde12...",
      "name": "Travel Goals",
      "created_by": "johndoe",
      "date_created": "2023-09-12T10:00:00Z",
      "date_modified": "2023-09-12T10:30:00Z"
    }
  ]
}
```

---

### 2. Bucketlist Routes

#### **Get All Bucketlists**
- **GET** `/api/bucketlists`  
- Requires JWT.  
- Returns all bucketlists created by the logged-in user.  
- Supports search query `?q=` for filtering by name.

**Example:**  
`GET /api/bucketlists?q=Travel`

---

#### **Get Single Bucketlist**
- **GET** `/api/bucketlists/:bucketlistId`  
- Returns a specific bucketlist owned by the user.

---

#### **Create Bucketlist**
- **POST** `/api/bucketlists`  

**Request Body:**
```json
{
  "name": "My Adventures",
  "created_by": "johndoe"
}
```

**Response:**
```json
{
  "_id": "6500a7bcde12...",
  "name": "My Adventures",
  "created_by": "johndoe",
  "date_created": "2023-09-12T10:00:00Z"
}
```

---

#### **Add Item to Bucketlist**
- **PUT** `/api/bucketlists/:bucketlistId/items`  

**Request Body:**
```json
{
  "name": "Climb Mount Everest",
  "done": false
}
```

---

#### **Delete Bucketlist**
- **DELETE** `/api/bucketlists/:bucketlistId`  

**Response:**
```json
{
  "success": true,
  "msg": "Bucketlist deleted"
}
```

---

## Models

### **User**
```js
{
  name: String,
  email: String,
  username: String,
  password: String
}
```

### **Bucketlist**
```js
{
  id: Number,
  name: String,
  created_by: String,
  items: [
    {
      id: Number,
      name: String,
      done: Boolean,
      date_created: Date,
      date_modified: Date
    }
  ],
  date_created: Date,
  date_modified: Date
}
```

---

## Dependencies

- **Node.js** v14+
- **Express** (Web framework)
- **Mongoose** (MongoDB ODM)
- **Passport + JWT** (Authentication)
- **Supertest & Jest** (Testing)

---

## Installation

```bash
# Clone repo
git clone https://github.com/darlingtim/bucket_list_Api.git

# Install dependencies
npm install

# Start server
npm start
```

---

## Testing

```bash
# Run tests
npm test
```

---

## Future Enhancements

- Swagger/OpenAPI integration  
- Role-based access control (RBAC)  
- Email notifications for bucketlist updates  

---
