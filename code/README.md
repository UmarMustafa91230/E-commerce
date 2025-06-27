# E-commerce

## User Management

The application provides a robust user management system with the following features:

### Features
- **User Registration & Login:** Users can register and log in using their email and password. JWT tokens are used for authentication.
- **Profile Management:** Users can view and update their profile information, including uploading an avatar.
- **Password Reset & OTP:** Users can reset their password using OTP sent to their email.
- **Role Management:** Admins can change user roles between `user` and `admin`.
- **Ban/Unban Users:** Admins can ban or unban users, preventing banned users from accessing protected routes.
- **Admin User Management:** Admins can view all users, update user details, and manage user roles and ban status.

### Key API Endpoints
- `POST /api/v1/auth/register` — Register a new user
- `POST /api/v1/auth/login` — User login
- `GET /api/v1/users/profile` — Get current user's profile (auth required)
- `PUT /api/v1/users/profile` — Update profile (auth required)
- `PUT /api/v1/admin/users/:id/role` — Change user role (admin only)
- `PUT /api/v1/admin/users/:id/ban` — Ban/unban a user (admin only)
- `GET /api/v1/admin/users` — List all users (admin only)

### Flow
- Regular users can register, log in, and manage their own profile.
- Admins have access to additional user management features via the admin dashboard.

---

## Product Management

Admins can manage products through a dedicated interface and API endpoints.

### Features
- **Create Product:** Admins can add new products with details and images.
- **Update Product:** Admins can edit product details and images.
- **Delete Product:** Admins can remove products from the catalog.
- **List & View Products:** All users can view product listings and details.
- **Stock Management:** Products display stock status (in stock, low stock, out of stock).

### Key API Endpoints
- `GET /api/v1/products` — List all products
- `GET /api/v1/products/:id` — Get product details
- `POST /api/v1/products` — Create a new product (admin only)
- `PUT /api/v1/products/:id` — Update a product (admin only)
- `DELETE /api/v1/products/:id` — Delete a product (admin only)

### Flow
- Admins use the admin dashboard to create, update, or delete products.
- All users can browse and view product details.

---

For more details, see the respective controller and route files in the backend, and the Redux slices and pages in the frontend.
