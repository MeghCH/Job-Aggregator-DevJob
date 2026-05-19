# Brute-Force Protection

## Method

Rate limiting via `express-rate-limit` on the `/api/auth/login` endpoint.

## Configuration

- Max attempts: 5 per IP
- Window: 15 minutes
- HTTP status on block: 429 Too Many Requests

## Code reference

- `middleware/rateLimitMiddleware.js`
- `routes/authRoute.js`

## Attack scenario blocked

An attacker trying to guess a password by sending thousands of login requests will be blocked after 5 attempts for 15 minutes.
