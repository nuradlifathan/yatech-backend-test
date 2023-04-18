# Yatech Backend Developer Test - API Documentation
This is an example implementation of JSON Web Token (JWT) refresh tokens in a Node.js application. It includes a simple server-side implementation using Express.js, and a JWT helper module for handling JWT token signing, verification, and refresh token management.

## Features
- User authentication with JWT access tokens and refresh tokens
- Automatic generation of new access tokens using refresh tokens
- In-memory storage of refresh tokens (for demonstration purposes only; in a production environment, - you should use a more secure and scalable storage solution, such as a database)
- Express.js middleware for token authentication
- Example routes for user registration, login, and token refresh

## Usage
### User Registration

- POST /api/register: Register a new user with a username and password. Returns a username and password included hashed password using bcyrpt module.
<img width="1594" alt="Screenshot 2023-04-19 at 06 23 15" src="https://user-images.githubusercontent.com/110319524/232926813-76ed10de-416b-4fa3-8826-976d10074ea2.png">

### User Login
- POST /api/login: Authenticate a user with a username and password. Returns a JWT access token and refresh token.
<img width="1594" alt="Screenshot 2023-04-19 at 06 40 48" src="https://user-images.githubusercontent.com/110319524/232927807-465024e4-a68e-410c-95c7-e58598ba4597.png">

### Refresh Access Token
- POST /api/refresh-token: Refresh the access token using a valid refresh token. Returns a new JWT access token.
<img width="1594" alt="Screenshot 2023-04-19 at 06 44 48" src="https://user-images.githubusercontent.com/110319524/232928213-4f883335-149e-4e1d-aee7-40e418fa7042.png">

### Access Protected Route
- GET /api/protected: Access a protected route that requires authentication. Requires a valid JWT access token in the Authorization header.

- Request Headers
Authorization: Bearer Token : "yourAccessToken"
<img width="1594" alt="Screenshot 2023-04-19 at 06 47 01" src="https://user-images.githubusercontent.com/110319524/232928566-64ad440f-7414-4c8d-b4e5-9fb1fe0f0b95.png">

- Successful Response
<img width="1594" alt="Screenshot 2023-04-19 at 06 50 07" src="https://user-images.githubusercontent.com/110319524/232928796-c8d51e09-f1c5-46b5-bb66-4ece74a04ece.png">


## JWT Helper Module
The JWT helper module (lib/jwt.js) provides the following functions:

- sign(payload): Signs a JWT token with the provided payload and returns the signed token.
- verify(token): Verifies a JWT token and returns the decoded payload.
- refreshToken(token): Adds a refresh token to the in-memory refresh tokens storage.

The module uses the jsonwebtoken library for signing and verifying JWT tokens.
