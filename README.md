# 🛒 E-commerce Website - MERN Stack

A full-featured E-commerce web application with **User Management** and **Product Management** systems built using the MERN stack (MongoDB, Express, React, Node.js). This project supports secure authentication, admin features, and user/customer interaction with the product catalog.

---

## 🚀 Features

### ✅ User Management
- User Registration & Login (with JWT auth)
- Profile Update & Avatar Upload
- Password Reset via OTP Email
- Role-Based Access Control (`user`, `admin`)
- Admin can:
  - View all users
  - Change user roles
  - Ban/unban users

### 🛍️ Product Management
- Admin can:
  - Add new products
  - Edit existing products
  - Delete products
  - Manage stock
- All users can:
  - View product list
  - Search & filter products
  - View detailed product page

---

## 🛠️ Technologies Used

- **Frontend:** React, Redux Toolkit, Axios, Tailwind CSS (or Bootstrap)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT, Bcrypt
- **Mail Service:** Nodemailer for OTP
- **Cloud Storage (optional):** Cloudinary or local file system

---

## 📦 Installation & Setup Instructions

> 💡 This guide is for running the project locally on your machine from scratch.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### 🔐 Create `.env` file in `backend` directory
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
FRONTEND_URL=http://localhost:3000
```
## 📧 How to Set Up `EMAIL_USER` and `EMAIL_PASS` for Sending OTP Emails

To enable OTP email functionality in this project, you need to configure a valid email service. Here's how to do it safely using Gmail:

---

### ✅ Recommended: Use Gmail with App Passwords

If you're using Gmail, **do not use your real password**. Instead, generate a secure **App Password** by following these steps:

### 🔐 Steps to Generate Gmail App Password

1. Visit [https://myaccount.google.com/](https://myaccount.google.com/)
2. Sign in to your Google account.
3. Navigate to the **Security** section from the left sidebar.
4. Under **"Signing in to Google"**, turn on **2-Step Verification**.
5. After enabling it, go back to the **Security** section and click **App Passwords**.
6. Choose:
   - **App**: Mail
   - **Device**: Other (enter "Ecommerce App" or similar)
7. Click **Generate**.
8. Copy the 16-character password that appears — this is your `EMAIL_PASS`.

---

### 🧩 Update Your `.env` File

```env
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_generated_app_password



### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Create `.env` file in `frontend` directory
```env
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

---

## ▶️ Running the Project

### In two separate terminals:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

---

## 👥 Initial Admin Setup

1. Go to `http://localhost:3000/register` and **register a user**.
2. Open your **MongoDB Atlas or Compass**, find that user in the `users` collection.
3. Change their `role` from `"user"` to `"admin"` manually.
4. Now login as this **admin** to access admin features.
5. Register another user for **customer** functionality (keep role as `"user"`).
6. Use both credentials to test and explore the full workflow:
   - As admin: manage products and users.
   - As user: browse and view products.

---

## 📬 API Endpoints Overview

### User Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST   | `/api/v1/auth/register` | Register user |
| POST   | `/api/v1/auth/login` | Login user |
| GET    | `/api/v1/users/profile` | Get profile |
| PUT    | `/api/v1/users/profile` | Update profile |
| PUT    | `/api/v1/admin/users/:id/role` | Change user role |
| PUT    | `/api/v1/admin/users/:id/ban` | Ban/Unban user |
| GET    | `/api/v1/admin/users` | View all users |

### Product Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET    | `/api/v1/products` | View all products |
| GET    | `/api/v1/products/:id` | Product details |
| POST   | `/api/v1/products` | Add product (admin) |
| PUT    | `/api/v1/products/:id` | Edit product (admin) |
| DELETE | `/api/v1/products/:id` | Delete product (admin) |

---

## 📁 Folder Structure

```
ecommerce/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── slices/
│   │   └── App.js
└── README.md
```

---

## 🧪 Testing Checklist

- [x] Register user (admin and customer)
- [x] JWT authentication working
- [x] Admin can change roles, ban users
- [x] OTP email sending and verification
- [x] Admin CRUD on products
- [x] Customers can view and search products

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📧 Contact

Created by **UmarMustafa** — feel free to reach out if you have any questions or suggestions!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
