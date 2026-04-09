# Content Corner ✒️

A full-stack blog application built with **React + Node.js + MySQL**, where users can write, share, and discuss blog posts with a clean and user-friendly interface.

---

## 🚀 Features

### Core Features
- **Authentication** — Register, Login, Logout with JWT-based session management
- **User Profile** — View and edit account info (only for logged-in users)
- **Homepage** — Paginated list of recent blog posts (20 per page)
  - Post header as a clickable link
  - First 20 characters preview of post body
  - "You" label + Edit/Delete actions for your own posts
  - Comment count per post
- **Post Filters** (for logged-in users)
  - All Posts (default)
  - My Posts Only
  - Others' Posts Only
  - Posts Commented by Me
- **Full Post View**
  - Complete post body
  - Posted by info
  - Comment section (logged-in users can comment)
  - Edit/Delete comment (own comments only)
  - Edit/Delete post (own post only)

### Bonus Features (Added)
- 📷 **Blog Image Upload** — via Cloudinary
- 🗂️ **Category Tagging** for posts
- 🔍 **Search & Filter** by keyword
- 💀 **Loading Skeletons** for better UX

---

## 🛠️ Tech Stack

### Backend
| Package | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MySQL + Sequelize | Database & ORM |
| JWT | Authentication tokens |
| Bcrypt | Password hashing |
| Express Validator | Input validation |
| Multer + Multer-Storage-Cloudinary | Image upload to Cloudinary |

### Frontend
| Package | Purpose |
|---|---|
| React | UI framework |
| Redux Toolkit (RTK) | State management |
| RTK Query | Data fetching & caching |
| React Router | Client-side routing |
| React Hook Form | Form handling & validation |
| React Toastify | Toast notifications |
| Bootstrap | Responsive layout & styling |
| Font Awesome | Icons |

---

## 🗄️ Database Schema

**Tables:**
- `users` — user account info
- `address` — street, city, zip (linked to user via foreign key)
- `blogs` — post content, image, category, linked to user via foreign key
- `category` — blog categories
- `comments` — comments linked to blog & user via foreign keys

---

## 📁 Project Structure

```
blog-app/
├── client/                         # React frontend
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── components/
│       │   ├── Blog/               # Blog list, card, detail, modals
│       │   ├── Comment/            # Comment section, create, edit, delete
│       │   ├── User/               # Login, register, profile, route guards
│       │   └── common/             # Navbar, footer, home, 404
│       ├── store/
│       │   ├── store.js            # Redux store config
│       │   ├── Slice/              # Auth slice
│       │   └── services/           # RTK Query API slices
│       ├── Context Provider/       # Toast & app context
│       └── utils/                  # Form, token, text utilities
│
└── server/                         # Node.js backend
    ├── index.js                    # Entry point
    ├── config/                     # DB connection
    ├── controller/                 # Route handlers
    ├── middlewares/                # Auth & error middleware
    ├── models/                     # Sequelize models
    ├── routes/                     # Express routers
    ├── seeds/                      # Seed data & scripts
    ├── utils/                      # Cloudinary, token, validation utils
    └── validations/                # Express-validator schemas
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MySQL >= 8
- Cloudinary account (free tier works)

### 1. Clone the Repository

```bash
git clone https://github.com/aarti-soni3/blog-app.git
cd blog-app
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
DB_NAME=blog_app
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOSTNAME=localhost
PORT=3000
NODE_ENV=development
ACCESS_TOKEN_KEY=your_access_token_secret
REFRESH_TOKEN_KEY=your_refresh_token_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECREATKEY=your_cloudinary_secret
```

Run the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `/client`:

```env
VITE_ACCESSTOKEN_STORAGEKEY=accessToken
VITE_REFRESHTOKEN_STORAGEKEY=refreshToken
```

Run the frontend:

```bash
npm run dev
```

---

## 📌 API Endpoints Overview

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| GET | `/api/auth/access` | Get logged-in user data via token |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get tokens |
| POST | `/api/auth/logout` | Logout user |

### Users — `/api/users`
| Method | Route | Description |
|---|---|---|
| GET | `/api/users/:id` | Get user by ID |
| PATCH | `/api/users/:id` | Update user profile |
| DELETE | `/api/users/:id` | Delete user account |

### Blogs — `/api/blogs`
| Method | Route | Description |
|---|---|---|
| GET | `/api/blogs` | Get all posts (paginated, filterable) |
| POST | `/api/blogs` | Create post (auth required) |
| GET | `/api/blogs/:id` | Get single post |
| PATCH | `/api/blogs/:id` | Edit post (own only) |
| DELETE | `/api/blogs/:id` | Delete post (own only) |

### Category — `/api/category`
| Method | Route | Description |
|---|---|---|
| GET | `/api/category` | Get all categories |
| GET | `/api/category/:id` | Get category by ID |

### Comments — `/api/comments`
| Method | Route | Description |
|---|---|---|
| GET | `/api/comments` | Get all comments |
| POST | `/api/comments` | Add comment (auth required) |
| PATCH | `/api/comments/:id` | Edit comment (own only) |
| DELETE | `/api/comments/:id` | Delete comment (own only) |

---

## 🔐 Security & Validation

- Passwords hashed with **bcrypt** before storing
- Access & Refresh token strategy with **JWT**
- Routes protected via auth middleware
- All inputs validated using **Express Validator**
- Error messages returned in a consistent JSON format

---

## 📸 Screenshots

> _Add screenshots here after deployment_

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> Built with ❤️ using Node.js, React, and MySQL
