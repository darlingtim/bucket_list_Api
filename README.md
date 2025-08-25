# Bucket List API

A RESTful API that lets users **register**, **authenticate**, and perform **CRUD** operations on **bucket lists** and their **items**. Built with **Node.js**, **Express**, and **MongoDB** (via Mongoose). Includes quick-start install steps, example requests, and testing guidance.

![CI](https://github.com/darlingtim/bucket_list_Api/actions/workflows/ci.yml/badge.svg)

## Table of Contents
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Requirements](#requirements)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Running the App](#running-the-app)  
- [Usage Examples](#usage-examples)  
- [API Overview](#api-overview)  
- [Dependencies](#dependencies)  
- [Testing](#testing)  
- [Project Scripts](#project-scripts)  
- [Contributing](#contributing)  
- [License](#license)  
- [Author](#author)  
- [API Documentation](#documentation)


## Features
- User registration and login  
- Protected routes for authenticated users  
- CRUD for bucket lists  
- CRUD for items within a bucket list  
- JSON responses suitable for frontend or mobile clients  

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express  
- **Database:** MongoDB (Mongoose ODM)  
- **Auth:** JSON Web Tokens (JWT)  
- **Testing:** Jest, Supertest  

## Requirements
- **Node.js** v16+ (v18+ recommended)  
- **npm** v8+  
- **MongoDB** (local instance or hosted e.g., MongoDB Atlas)  

## Installation
```
git clone https://github.com/darlingtim/bucket_list_Api.git
cd bucket_list_Api
npm install
```

## Environment Variables
Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/bucket_list
APP_SECRET=replace-with-a-strong-secret
PORT=3000
```

## Running the App
```
npm start
# or with nodemon if configured
npm run dev
```

The server runs at: [http://localhost:3000](http://localhost:3000)

## Usage Examples

### Register
```
curl -X POST http://localhost:3000/auth/register   -H "Content-Type: application/json"   -d '{ "username": "jane", "password": "securepass123" }'
```

### Login
```
curl -X POST http://localhost:3000/auth/login   -H "Content-Type: application/json"   -d '{ "username": "jane", "password": "securepass123" }'
```

### Create Bucket List
```
curl -X POST http://localhost:3000/bucketlists   -H "Content-Type: application/json"   -H "Authorization: Bearer <token>"   -d '{ "name": "Europe Trip Goals" }'
```

### Get All Bucket Lists
```
curl -X GET http://localhost:3000/bucketlists   -H "Authorization: Bearer <token>"
```

### Add Item to Bucket List
```
curl -X POST http://localhost:3000/bucketlists/:id/items   -H "Content-Type: application/json"   -H "Authorization: Bearer <token>"   -d '{ "item": "Visit the Eiffel Tower" }'
```

### Delete Bucket List
```
curl -X DELETE http://localhost:3000/bucketlists/:id   -H "Authorization: Bearer <token>"
```

## API Overview
| Method | Endpoint                          | Description                  | Auth |
|--------|-----------------------------------|------------------------------|------|
| POST   | `/auth/register`                  | Register a new user          | No   |
| POST   | `/auth/login`                     | Login and return token       | No   |
| GET    | `/bucketlists`                    | List all bucket lists        | Yes  |
| POST   | `/bucketlists`                    | Create a new bucket list     | Yes  |
| GET    | `/bucketlists/:id`                | Get a single bucket list     | Yes  |
| PATCH  | `/bucketlists/:id`                | Update a bucket list         | Yes  |
| DELETE | `/bucketlists/:id`                | Delete a bucket list         | Yes  |
| POST   | `/bucketlists/:id/items`          | Add item to bucket list      | Yes  |
| PATCH  | `/bucketlists/:id/items/:itemId`  | Update a bucket list item    | Yes  |
| DELETE | `/bucketlists/:id/items/:itemId`  | Delete a bucket list item    | Yes  |

## Dependencies
- **express** – routing & HTTP server  
- **mongoose** – MongoDB ODM  
- **jsonwebtoken** – authentication (JWT)  
- **bcrypt** – password hashing  
- **dotenv** – environment variables  
- **cors** – cross-origin support  
- **morgan** – logging (optional)  
- **jest** – test framework  
- **supertest** – integration testing  

## Testing
```
npm install --save-dev jest supertest
npm test
```

If using ES Modules, configure Babel for Jest:

```
npm i -D babel-jest @babel/preset-env
```

Create `babel.config.js`:
```
export default {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

## Project Scripts
```
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --runInBand"
  }
}
```

## Contributing
1. Fork the repository  
2. Create your feature branch: `git checkout -b feature/my-change`  
3. Commit your changes: `git commit -m "feat: add some feature"`  
4. Push to the branch: `git push origin feature/my-change`  
5. Open a Pull Request  

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author
**[Timothy Ododo](https://github.com/darlingtim)**  
Repository: [https://github.com/darlingtim/bucket_list_Api](https://github.com/darlingtim/bucket_list_Api)

## 📖 Documentation
For full API reference, check out the [API Documentation](./docs/API-docs.md).

