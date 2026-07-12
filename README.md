# 🖥️ Vue 3 Authentication Client (FastAPI + HttpOnly Secure Cookies)

A Vue 3 Single Page Application demonstrating secure authentication against a FastAPI backend using JWT access tokens, refresh token rotation, refresh token reuse detection, and HttpOnly Secure cookie-based authentication.

The project uses:

- Vue 3
- Vite
- Pinia state management
- Vue Router
- HttpOnly Secure cookie authentication
- Protected routes
- FastAPI backend integration

This project was built to explore modern frontend authentication architecture, secure browser token handling, SPA authentication patterns, and integration with a production-style FastAPI authentication backend.

**Last updated:** 12-07-2026

---

# ✨ Features

- Vue 3 Single Page Application
- User login and logout
- Silent login possible if a valid Refresh token cookie exists
- Authentication using HttpOnly Secure cookies
- No JWT storage in localStorage
- Browser-managed authentication state
- Protected frontend routes
- Pinia authentication store
- User store for protected API data
- Automatic cookie handling with fetch credentials
- FastAPI backend integration
- CORS credential support
- Refresh token rotation support
- Protected API calls
- Authentication error handling
- Vue Router navigation
- Production-ready authentication structure

---

# 🧰 Tech Stack

- Vue 3
- Vite
- Pinia
- Vue Router
- JavaScript
- Fetch API
- VeeValidate
- Yup
- Bootstrap

Backend:

- FastAPI
- PostgreSQL
- JWT authentication
- HttpOnly Secure cookies

---

# 🏗️ Project Architecture

The project follows a simple frontend architecture:

## views

Contains application pages:

- Login page
- Home page
- Protected pages

## stores

Contains Pinia stores:

- Authentication state
- Current user handling
- User list handling

## helpers

Contains shared utilities:

- Fetch wrapper
- Router configuration

## router

Contains:

- Application routes
- Navigation handling
- Protected route logic

The structure keeps authentication logic separated from UI components.

---

# 🔐 Authentication Flow

The Vue application uses cookie-based authentication.

The backend creates:

- Access token cookie
- Refresh token cookie

The browser stores both cookies automatically.

The Vue application does not read or store JWT tokens.

Authentication state is managed by:

- Pinia
- Backend validation
- Browser cookies

---

# 🔑 Login Flow

The user enters:

- Username
- Password

Vue sends:

POST `/login-cookie`

The FastAPI backend:

1. Validates user credentials.
2. Creates an access token.
3. Creates a refresh token.
4. Stores refresh token information in PostgreSQL.
5. Returns authentication cookies.

The browser stores:

- access_token cookie
- refresh_token cookie

The cookies are:

- HttpOnly
- Secure
- SameSite protected

---

# 🍪 HttpOnly Cookie Authentication

The frontend uses browser-managed cookies.

Benefits:

- JavaScript cannot access authentication tokens.
- Tokens are not stored in localStorage.
- Reduced exposure to token theft through XSS.
- Browser automatically sends cookies to the API.
- Authentication handling is simplified.

API requests use:

`credentials: include`

This allows cookies to be sent with cross-origin requests.

---

# 🔄 Refresh Token Handling

When authentication needs renewal:

Vue calls:

POST `/refresh-token-spa`

The browser automatically sends:

- refresh_token cookie

The backend:

1. Validates the refresh token.
2. Checks database token status.
3. Creates new tokens.
4. Rotates the refresh token.
5. Sends updated cookies.

The Vue application never handles the refresh token directly.

---

# 🛡️ Protected Routes

The application supports protected frontend routes.

Example:

User opens the homepage.

The application:

1. Requests the current user from the API.
2. Loads protected data.
3. Displays authenticated content.

If authentication fails:

- User is redirected to login.

---

# 🌐 Backend Configuration

Create a `.env` file:

VITE_API_URL=http://127.0.0.1:8000


Production example:


VITE_API_URL=https://your-fastapi-domain.com


The FastAPI backend must allow:

- Vue origin
- Credentials
- Cookies

Example:
allow_credentials=True

---

# ⚙️ Setup Instructions

## 1. Clone Repository


git clone <your-repository-url>

cd <your-project-folder>


---

## 2. Install Dependencies


npm install


---

## 3. Configure Environment Variables

Create:


.env


Add:


VITE_API_URL=http://127.0.0.1:8000


---

## 4. Start Development Server


npm run dev


The application runs on:


http://localhost:3000


---

# 🌍 Production Build

Create production files:


npm run build


The generated application is placed in:


dist/


---

# 🔗 FastAPI Backend Integration

This frontend was designed for a FastAPI authentication backend supporting:

- JWT authentication
- HttpOnly Secure cookies
- Refresh token rotation
- Refresh token reuse detection
- PostgreSQL refresh token tracking
- Swagger OAuth2 authentication

---

# 🧪 Authentication Testing

Test users:


Username: testuser
Password: admin


or:


Username: admin
Password: admin


---

## Test Flow

1. Open the login page.
2. Enter username and password.
3. Verify authentication cookies in browser developer tools.
4. Open the protected homepage.
5. Load protected user data.
6. Logout.
7. Verify cookies are removed.
8. Login again and test refresh behaviour.

---

# 📡 API Communication

## Login

POST

`/login-cookie`

Creates:

- Access token cookie
- Refresh token cookie

---

## Current User

GET

`/users/me`

Returns:

- Current authenticated user

---

## Users

GET

`/get-all-users`

Returns:

- Protected user list

---

## Refresh Authentication

POST

`/refresh-token-spa`

Creates:

- New access cookie
- New refresh cookie

---

## Logout

POST

`/logout`

Actions:

- Revokes refresh token
- Clears authentication cookies

---

# 🛡️ Security Notes

- JWT tokens are not stored in localStorage.
- Refresh tokens are never exposed to JavaScript.
- Authentication uses HttpOnly cookies.
- Browser manages authentication cookies.
- Protected requests are validated by the backend.
- Refresh tokens are rotated.
- Reused refresh tokens are rejected.
- Logout removes authentication cookies.
- CORS credentials are enabled for cookie authentication.

---

# 🚀 Future Improvements

- Add automatic refresh interceptor
- Add TypeScript migration
- Add frontend unit tests
- Add end-to-end testing
- Add CI/CD pipeline
- Add role-based route protection
- Add improved authentication loading states

---

# 🎯 Learning Goals

- Vue 3 application architecture
- Pinia state management
- Secure SPA authentication
- HttpOnly cookie authentication
- JWT authentication flows
- Refresh token rotation
- FastAPI frontend integration
- Protected routes
- Modern frontend security practices

---

# 👨‍💻 Author

Built by Per Olsen

Frontend portfolio project exploring secure authentication patterns, Vue 3 architecture, and integration with modern FastAPI backend systems.